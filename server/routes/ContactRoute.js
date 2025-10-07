import express from "express";
import { getAllContacts, createContact, patchContact, deleteConctact } from "../controllers/ContactController.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.get("/", requireAuth, getAllContacts);
router.post("/", requireAuth, createContact);
router.patch("/:id", requireAuth, patchContact);
router.delete("/:id", requireAuth, deleteConctact);

export default router;