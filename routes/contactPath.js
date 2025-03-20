import express from "express";
import { createContact, getAllContacts, getContactById, deleteContactById } from "../controllers/contactcontroller.js";

const router = express.Router();

router.post("/contact", createContact);
router.get("/contacts", getAllContacts);
router.get("/contact/:id", getContactById);
router.delete("/contact/:id", deleteContactById);

export default router;
