import express from 'express';
import { createParking, getParkings, getParkingHistory, parkVehicle, endParkingSession, clearParkingHistory, getParkingStats } from '../controllers/parkingController.js';
import passport from 'passport';

const router = express.Router();

router.put('/:id/exit', passport.authenticate('jwt', { session: false }), endParkingSession)

router.post('/park', passport.authenticate('jwt', { session: false }), parkVehicle)
router.post('/', passport.authenticate('jwt', { session: false }), createParking)

router.get('/', passport.authenticate('jwt', { session: false }), getParkings)
router.get('/history', passport.authenticate('jwt', { session: false }), getParkingHistory)
router.get('/stats', passport.authenticate('jwt', { session: false }), getParkingStats)
router.delete('/history/clear', passport.authenticate('jwt', { session: false }), clearParkingHistory)





export default router;