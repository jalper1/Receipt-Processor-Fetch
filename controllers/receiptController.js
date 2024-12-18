import { generateReceiptId } from "../utils/GenerateReceiptId.js";
import { calculatePoints } from "../utils/PointCalculator.js";
import { validateReceipt } from "../validations/receiptValidation.js";

const receipts = {}; // In-memory storage for receipts

export const processReceipt = (req, res) => {
  // Validate the request
  const { error } = validateReceipt(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const receiptId = generateReceiptId();
  receipts[receiptId] = req.body;
  res.status(200).json({ id: receiptId });
};

export const getPoints = (req, res) => {
  const { id } = req.params;

  if (!receipts[id]) {
    return res.status(404).json({ error: "Receipt not found" });
  }

  const points = calculatePoints(receipts[id]);
  res.status(200).json({ points });
};
