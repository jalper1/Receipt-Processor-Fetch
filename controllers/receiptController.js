// Import utility functions and validations
import { generateReceiptId } from "../utils/generateReceiptId.js"; // Generates a unique ID for receipts
import { calculatePoints } from "../utils/pointCalculator.js"; // Calculates points based on receipt details
import { validateReceipt } from "../validations/receiptValidation.js"; // Validates receipt structure and data

// In-memory storage for receipts
const receipts = {};

/**
 * Processes a receipt by validating the input, generating a unique receipt ID,
 * and storing the receipt in memory.
 *
 * @param {Object} req - Express request object, expects receipt data in the body
 * @param {Object} res - Express response object
 */
export const processReceipt = (req, res) => {
  // Validate the request body against the receipt schema
  const { error } = validateReceipt(req.body);
  if (error) {
    // If validation fails, respond with a 400 status and error details
    return res.status(400).json({ error: error.details[0].message });
  }

  // Generate a unique ID for the receipt
  const receiptId = generateReceiptId();

  // Store the receipt data in memory using the generated ID
  receipts[receiptId] = req.body;

  // Respond with the generated receipt ID
  res.status(200).json({ id: receiptId });
};

/**
 * Retrieves the points associated with a receipt based on its ID.
 *
 * @param {Object} req - Express request object, expects receipt ID as a URL parameter
 * @param {Object} res - Express response object
 */
export const getPoints = (req, res) => {
  const { id } = req.params; // Extract the receipt ID from the URL parameters

  // Check if the receipt exists in memory
  if (!receipts[id]) {
    // If not found, respond with a 404 status and an error message
    return res.status(404).json({ error: "Receipt not found" });
  }

  // Calculate the points for the receipt
  const points = calculatePoints(receipts[id]);

  // Respond with the calculated points
  res.status(200).json({ points });
};
