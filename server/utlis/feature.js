//create token and saving cookie
import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { getBase64, getSockets } from '../lib/helper.js';

export const cookieOptions = {
    httpOnly: true, 
    secure: true,
    sameSite: 'Strict', 
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };

export const sendToken =(user,statusCode,res)=>{
    const token = user.getJWTToken();
    
    //option for cookies

    const options={
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24*60*60*1000
        ),
        httpOnly:true
    };

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    });
};

export const emitEvent=(req,event,users,data)=>{
    console.log("Emitting event")
    const io=req.app.get("io");

    const usersSocket=getSockets(users);
    io.to(usersSocket).emit(event,data)
  }
  
  
export const deleteFileFromCloundry=(public_ids)=>{
    console.log("Emitting event")
  }

export const uploadFileToCloudinary = async (files = []) => {
    try {
        const uploadPromises = files.map(file => {
            const uniqueId = uuidv4(); // Generate a unique ID for each file
            return new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(
                    getBase64(file), {
                    resource_type: "auto",
                    public_id: uniqueId
                }, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id
                    });
                });
            });
        });

        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        throw new Error(`Failed to upload files: ${error.message}`);
    }
};