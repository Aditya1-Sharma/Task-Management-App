import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./utils/ApiError.js";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(errorHandler);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);

export default app;
