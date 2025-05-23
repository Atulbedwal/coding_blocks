import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createParking = async (req, res) => {
  try {
    const { amount, vehicleId } = req.body;
const timeIn = new Date();
    const parking = await prisma.parking.create({
      data: {
        timeIn: new Date(),
        amount: 0,
        vehicleId,
        userId: req.user.id, // From passport authentication
      },
    });
    res.status(201).json(parking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getParkings = async (req, res) => {
  try {
    const parkings = await prisma.parking.findMany({
      where: {
        userId: req.user.id, 
      },
    });
    res.status(200).json(parkings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getParkingHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await prisma.parking.findMany({
      where: { userId },
      include: {
        vehicle: true, // makes item.vehicle accessible
      },
      orderBy: {
        timeIn: 'desc',
      },
    });

    const formatted = history.map((item) => ({
      id: item.id,
      vehicleNumber: item.vehicle?.number || "Unknown",
      vehicleType: item.vehicle?.type || "N/A",
      timeIn: item.timeIn,
      timeOut: item.timeOut,
      duration: item.timeOut
        ? calculateDuration(item.timeIn, item.timeOut)
        : "Active",
      amount: item.amount,
      status: item.timeOut ? "completed" : "active",
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper function
function calculateDuration(start, end) {
  const ms = new Date(end) - new Date(start);
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}



export const parkVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.body;

    if (!vehicleId) {
      return res.status(400).json({ error: "Vehicle ID is required" });
    }

    const parking = await prisma.parking.create({
      data: {
        vehicleId: parseInt(vehicleId),
        userId: req.user.id,
        timeIn: new Date(),  // This is the fix
        status: "active",
        amount: 0,              // You can change this if you want to calculate later
      },
    });

    res.status(201).json(parking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const endParkingSession = async (req, res) => {
  try {
    const { id } = req.params;
    const parking = await prisma.parking.findUnique({
      where: { id: parseInt(id) },
      include: { vehicle: true },
    });

    if (!parking) {
      return res.status(404).json({ error: "Parking entry not found" });
    }

    if (parking.timeOut) {
      return res.status(400).json({ error: "Already exited" });
    }

    const now = new Date();
    const diffMs = now - parking.timeIn;
    const hours = Math.ceil(diffMs / (1000 * 60 * 60)); // round up to next hour

    const isFree = parking.vehicle.fuelType === "ELECTRIC";
    const charge = isFree ? 0 : hours * 50;

    // Update the parking entry
    const updated = await prisma.parking.update({
      where: { id: parseInt(id) },
      data: {
        timeOut: now,
        amount: charge,
        status: "completed",
      },
    });

    // Deduct from wallet if not free
    if (!isFree) {
      await prisma.wallet.update({
        where: { userId: parking.userId },
        data: {
          balance: {
            decrement: charge,
          },
        },
      });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearParkingHistory = async (req, res) => {
  try {
    await prisma.parking.deleteMany({
      where: { userId: req.user.id },
    })
    res.status(200).json({ message: "Parking history cleared." })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getParkingStats = async (req, res) => {
  try {
    const totalSlots = {
      "2-wheeler": 100,
      "3-wheeler": 50,
      "4-wheeler": 200,
    };

    const activeParkings = await prisma.parking.findMany({
      where: { timeOut: null },
      include: { vehicle: true },
    });

    const occupied = {
      "2-wheeler": 0,
      "3-wheeler": 0,
      "4-wheeler": 0,
    };

    for (const entry of activeParkings) {
      const type = entry.vehicle?.type;
      if (occupied[type] !== undefined) {
        occupied[type]++;
      }
    }

    const stats = {};
    for (const type in totalSlots) {
      stats[type] = {
        total: totalSlots[type],
        occupied: occupied[type],
      };
    }

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

