// Importing the Express framework and the receiptRoutes module for routing
import express from "express";
import receiptRoutes from "./routes/receiptRoutes.js";

// Creating an Express app instance
const app = express();

// Setting the port for the server to listen on (defaults to 4000 if not set in environment variables)
const PORT = process.env.PORT || 4000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Registering the receipt routes under the '/receipts' path
app.use("/receipts", receiptRoutes);

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the server start message
});
