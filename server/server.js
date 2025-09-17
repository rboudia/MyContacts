import express from "express";
/*import path from "path";
import bodyParser from "body-parser";
import cors from "cors";*/
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/db.js";




dotenv.config({ path: "./config/.env" });

const server = express();

connectDB();

server.listen(process.env.PORT, () => {
  console.log(`Serveur écoute le port ${process.env.PORT}`);
});

export default server;