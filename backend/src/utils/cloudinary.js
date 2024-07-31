import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadFile = async (localPath, folder = 'uploads') => {
  try {
    if (!fs.existsSync(localPath)) {
      throw new Error('File not found');
    }
    const result = await cloudinary.uploader.upload(localPath, {
      folder: folder,
    });
    fs.unlinkSync(localPath);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default uploadFile;
