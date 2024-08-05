import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/index.js";
dotenv.config({
  path: "./.env",
});

console.log(process.env.NAME);
await connectDB()
  .then(() => {
    console.log("Mongo db connected");
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is up and running at port", process.env.PORT);
});
