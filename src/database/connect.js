const mongoose=require("mongoose");
require("dotenv").config();

const MONGODB_URI=process.env.MONGODB_URI;
if(!MONGODB_URI){
    console.log("✖ MONGODB_URI is not defined in .env");
    process.exit(1);
}

mongoose.set('strictQuery',false);

const connectDB=async()=>{
    try{
        
        await mongoose.connect(MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
       console.log('✅ MongoDB connected');
    }
    catch(err){
console.error('✖ MongoDB connection error:', err);
        process.exit(1);
    }
}


process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('MongoDB disconnected through app termination');
    process.exit(0);
});

module.exports=connectDB;