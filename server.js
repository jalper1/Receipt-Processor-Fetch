import express from "express";
import receiptRoutes from "./routes/receiptRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Use routes
app.use("/receipts", receiptRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
