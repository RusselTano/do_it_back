import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Mongodb connected successfully!");
  } catch (err) {
    console.log("❌ Mongodb connection failed : ", err.message);
    process.exit(1); 
  }
};

export default connectDB;
