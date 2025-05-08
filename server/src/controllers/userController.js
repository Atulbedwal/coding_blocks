// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// exports.registerUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: { email, password: hashedPassword }
//     });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) return res.status(400).json({ error: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getProfile = async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({ where: { id: req.user.id }, include: { vehicles: true, wallet: true, parkings: true } });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
