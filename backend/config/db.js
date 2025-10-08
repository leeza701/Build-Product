import mongoose from 'mongoose';
const connectDB=async()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI);
     console.log("database is connected");
    } catch (error) {
        console.log("connectinon failde");
        process.exit(1);
    }
}

export default connectDB;