// src/models/Vehicle.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Example function to create a vehicle
async function createVehicle(number, fuelType, photo, userId) {
  const vehicle = await prisma.vehicle.create({
    data: {
      number,
      fuelType,
      photo,
      userId, // Assumes you have a userId to associate the vehicle with
    },
  });
  return vehicle;
}

// Example function to get a vehicle by id
async function getVehicleById(id) {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: id,
    },
  });
  return vehicle;
}

export { createVehicle, getVehicleById };