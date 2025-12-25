import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
    cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key:process.env.API_KEY, 
        api_secret:process.env.SECRET_KEY
    });

    const uploadoncloudinary=async(filepath)=>{
        try {
            const result=await cloudinary.uploader.upload(filepath,{resource_type:'auto'})
            fs.unlink(filepath)
            return result.secure_url;
        } catch (error) {
            console.log(error)
            fs.unlink(filepath)
        }
    }

    export default uploadoncloudinary;