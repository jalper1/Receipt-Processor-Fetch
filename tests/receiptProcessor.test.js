// Importing the function that calculates points based on receipt details
import { calculatePoints } from "../utils/pointCalculator.js";

describe("Receipt Points Calculation", () => {
  // Test case to verify the points calculation for a sample receipt
  test("calculates points correctly for sample receipt", () => {
    // Defining a sample receipt object to be used in the test
    const sampleReceipt = {
      retailer: "Target", // Name of the retailer
      purchaseDate: "2022-01-01", // Date of purchase
      purchaseTime: "13:01", // Time of purchase
      items: [
        // Array of purchased items
        {
          shortDescription: "Mountain Dew 12PK", // Item description
          price: "6.49", // Item price
        },
        {
          shortDescription: "Emils Cheese Pizza",
          price: "12.25",
        },
        {
          shortDescription: "Knorr Creamy Chicken",
          price: "1.26",
        },
        {
          shortDescription: "Doritos Nacho Cheese",
          price: "3.35",
        },
        {
          shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
          price: "12.00",
        },
      ],
      total: "35.35", // Total cost of the receipt
    };

    // Calling the calculatePoints function with the sample receipt
    const points = calculatePoints(sampleReceipt);

    // Asserting that the calculated points match the expected value
    expect(points).toBe(28);
  });
});
