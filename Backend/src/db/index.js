import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDb is connected || DB host ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDb connection error", error);
    process.exit(1);
  }
};
