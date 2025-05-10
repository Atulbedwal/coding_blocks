import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/passport.js'; // Passport configuration
import vehicleRoutes from './routes/vehicleRoutes.js';
import parkingRoutes from './routes/parkingRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import passport from "passport";
import configurePassport from './utils/passport.js';

configurePassport(passport);
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "https://coding-blocks-iota.vercel.app"
   ,
  credentials: true               
}));
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/wallet', walletRoutes);


app.get('/', (req, res) => {
  res.send('Backend API is running!');
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

