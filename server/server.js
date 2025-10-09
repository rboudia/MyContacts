import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json" with {type: "json"};

import userRouter from "./routes/UserRoute.js";
import authRouter from "./routes/AuthRoute.js"
import contactRouter from "./routes/ContactRoute.js";


dotenv.config({ path: "./config/.env" });

const server = express();
server.use(cors(
  {origin: process.env.CORS_ORIGIN,
  credentials: true
}));
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(express.json());

connectDB();

server.use("/", userRouter);
server.use("/auth", authRouter);
server.use("/contacts", contactRouter);

server.listen(process.env.PORT, () => {
  console.log(`Serveur écoute le port ${process.env.PORT}`);
});

export default server;