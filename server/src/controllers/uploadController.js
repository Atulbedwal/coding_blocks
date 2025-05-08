// server/src/controllers/upload.controller.js
import { uploadToCloudinary } from '../services/cloudinary.service.js';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer);
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};