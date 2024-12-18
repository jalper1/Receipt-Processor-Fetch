import express from "express";
import { processReceipt, getPoints } from "../controllers/receiptController.js";

const router = express.Router();

router.post("/process", processReceipt);
router.get("/:id/points", getPoints);

export default router;
