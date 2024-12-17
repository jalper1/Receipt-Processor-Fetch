import { generateReceiptPoints } from "./generateReceiptPoints"; // import generateReceiptPoints function

const express = require("express"); // import express
const app = express(); // create express app
const PORT = process.env.PORT || 4000; // define port number

const receipts = {}; // object to store receipts

app.use(express.json()); // middleware to parse JSON

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// define route to get receipt points based on receipt id
app.get("/receipts/:id/points", (req, res) => {
  const receiptId = req.params.id; // get receipt id from request params
  if (receipts.hasOwnProperty(receiptId)) {
    // check if receipt id exists in receipts object
    const receiptData = receipts[receiptId].data; // get receipt data from receipts object
    const receiptPoints = generateReceiptPoints(receiptData); // generate receipt points
    receipts[receiptId].points = receiptPoints; // store receipt points in receipts object
    res.json({ points: receiptPoints }); // send receipt points as response json
  } else {
    res.status(404).json({ error: "Receipt not found" }); // send error response if receipt id not found
  }
});