import express from 'express';
import { addMoney, getWallet } from '../controllers/walletController.js';
import passport from 'passport';

const router = express.Router();

router.post('/add', passport.authenticate('jwt', { session: false }), addMoney);
router.get('/', passport.authenticate('jwt', { session: false }), getWallet);

export default router;