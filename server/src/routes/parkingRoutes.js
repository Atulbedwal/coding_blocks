import express from 'express';
import { createParking, getParkings, getParkingHistory, parkVehicle, endParkingSession } from '../controllers/parkingController.js';
import passport from 'passport';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), createParking);
router.get('/', passport.authenticate('jwt', { session: false }), getParkings);
router.get('/history', passport.authenticate('jwt', { session: false }), getParkingHistory);
router.post('/', passport.authenticate('jwt', { session: false }), parkVehicle);
router.put('/:id/exit', passport.authenticate('jwt', { session: false }), endParkingSession);




export default router;