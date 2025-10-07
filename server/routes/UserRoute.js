import express from "express";
import { getAllUsers } from "../controllers/UserController.js";
import { requireAuth } from "../middlewares/requireAuth.js";


const router = express.Router();

router.get("/users", requireAuth, getAllUsers);

export default router;