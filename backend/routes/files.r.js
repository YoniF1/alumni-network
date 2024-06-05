import express from 'express'
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import multer from 'multer'
import { promises as fs } from 'fs'
dotenv.config()

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env
const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('profilePicture'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.')
    }
  
    try {
      const filePath = req.file.path;
  
      cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
      });
  
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: 'profile_pictures', 
      });
  
      await fs.unlink(filePath)
  
      res.send({ url: uploadResult.secure_url })
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error)
      res.status(500).send('Error uploading to Cloudinary')
    }
  });
  
export default router
