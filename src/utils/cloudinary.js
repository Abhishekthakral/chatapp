import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret:process.env.CLOUD_SECRET
}); 

const uploadOnCloudinary=async(localPath)=>{
    try{
    //checking if local path exist
    if(!localPath){
        return null
    }
    //uploading file on cloud
    const response= await cloudinary.uploader
           .upload(
               localPath, {
                fetch_format: 'auto',
               }
           )
           //uploaded successfully
           fs.unlinkSync(localPath)
           return response;
        }catch(err){
            //failed to upload so cleared from local so that we can demand it again from user
            fs.unlinkSync(localPath)
            console.log(err);
           };
}

export default uploadOnCloudinary;