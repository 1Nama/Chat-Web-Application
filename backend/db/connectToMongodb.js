import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("MONGO_DB_URI:", process.env.MONGO_DB_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const connectToMongodb= async () => {
  try{
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  }catch(error){
    console.log("Error connecting Database",error.message);
  }
}

export default connectToMongodb;