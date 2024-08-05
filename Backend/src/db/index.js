import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDb is connected || DB host ${
        (await connectionInstance).connection.host
      }`
    );
  } catch (error) {
    console.error("MongoDb connection error", error);
    process.exit(1);
  }
};
