import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    // Find or create a wallet for the user with initial balance 0 if it doesn't exist
    const wallet = await prisma.wallet.upsert({
      where: { userId: req.user.id },
      update: {
        balance: { increment: amount },
        lastAdded: new Date(), // add this line
      },
      create: {
        userId: req.user.id,
        balance: amount,
        lastAdded: new Date(),
      },
    });

    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWallet = async (req, res) => {
  try {
    // Retrieve the wallet for the authenticated user, or return a default balance of 0 if not found
    const wallet = await prisma.wallet.findUnique({
      where: { userId: req.user.id },
    });

    res.status(200).json(wallet || { balance: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};