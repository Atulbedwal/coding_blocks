// src/models/User.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Example function to create a user
async function createUser(email, password) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  return user;
}

// Example function to get a user by email
async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export { createUser, getUserByEmail };