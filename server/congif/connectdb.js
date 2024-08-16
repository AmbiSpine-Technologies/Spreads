import mongoose from "mongoose";



const connectDatabase=(mongodbURL)=>{
    mongoose.connect(mongodbURL)
    .then(()=>{
        console.log("Connected to mongoDB successfully")
    })
}

export default connectDatabase;