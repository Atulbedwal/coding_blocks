// server/src/routes/upload.routes.js
import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/upload.controller.js';
import passport from 'passport';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/', 
  passport.authenticate('jwt', { session: false }),
  upload.single('file'),
  uploadFile
);

export default router;