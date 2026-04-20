import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv";
dotenv.config();

// cloudinary.uploader
//   .upload("my_image.jpg")
//   .then(result=>console.log(result));




const cloud=cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_USERNAME, 
  api_key: process.env.CLOUDINARY_API, 
  api_secret:process.env.CLOUDINARY_SECRET
});

export default cloud;