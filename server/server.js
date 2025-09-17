import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/UserRoute.js";

dotenv.config({ path: "./config/.env" });

const server = express();

connectDB();

server.listen(process.env.PORT, () => {
  console.log(`Serveur écoute le port ${process.env.PORT}`);
});
server.use("/", userRouter);

export default server;