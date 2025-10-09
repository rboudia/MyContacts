import express from "express";
import { getAllContacts, createContact, patchContact, deleteContact } from "../controllers/ContactController.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.get("/", requireAuth, getAllContacts);
router.post("/", requireAuth, createContact);
router.patch("/:id", requireAuth, patchContact);
router.delete("/:id", requireAuth, deleteContact);

export default router;