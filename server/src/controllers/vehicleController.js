import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Add a new vehicle
export const addVehicle = async (req, res) => {
  try {
    const { number, type, fuelType, photoUrl } = req.body;

    if (!number || !type || !fuelType || !photoUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        number,    
        fuelType,
        photo: photoUrl,  // Updated to match the Prisma field 'photo'
        userId: req.user.id,  // Ensure user is authenticated
      },
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const delVehicle = async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.id);
    const userId = req.user.id;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle || vehicle.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to delete this vehicle" });
    }

    await prisma.vehicle.delete({
      where: { id: vehicleId },
    });

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.id);
    const { number, fuelType, photo } = req.body;

    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle || vehicle.userId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updated = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { number, fuelType, photo },
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Get all vehicles of the logged-in user
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};