import express from 'express';
import { addVehicle, getVehicles, delVehicle, updateVehicle } from '../controllers/vehicleController.js';
import passport from 'passport';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), addVehicle);
router.get('/', passport.authenticate('jwt', { session: false }), getVehicles);
router.delete('/:id', passport.authenticate('jwt', { session: false }), delVehicle);
router.put("/:id", passport.authenticate("jwt", { session: false }), updateVehicle);


export default router;