import { generateReceiptId } from "./ReceiptIdGenerator"; // import generateReceiptId function

const express = require("express"); // import express
const app = express(); // create express app
const PORT = process.env.PORT || 4000; // define port number

const receipts = {}; // object to store receipts

app.use(express.json()); // middleware to parse JSON

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// define route to post receipt and generate receipt id
app.post("/receipts/process", (req, res) => {
  const receiptId = generateReceiptId(); // generate receipt id
  const receiptData = {}; // object to store receipt data
  receipts[receiptId] = receiptData; // store receipt data in receipts object
  receipts[receiptId].data = req.body; // store request body in receipt data
  res.json({ id: receiptId }); // send receipt id as response json
});
