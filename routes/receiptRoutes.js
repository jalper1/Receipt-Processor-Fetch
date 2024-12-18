// Importing the Express framework to create a router
import express from "express";
// Importing controller functions for handling receipt processing and retrieving points
import { processReceipt, getPoints } from "../controllers/receiptController.js";

// Creating a new router instance
const router = express.Router();

// POST route for processing receipts
// This route expects receipt data in the request body and uses the processReceipt controller function
router.post("/process", processReceipt);

// GET route for retrieving points for a specific receipt
// The route takes a receipt ID as a URL parameter and uses the getPoints controller function
router.get("/:id/points", getPoints);

// Exporting the router to be used in other parts of the application
export default router;
