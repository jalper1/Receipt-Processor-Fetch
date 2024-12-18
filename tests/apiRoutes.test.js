import request from "supertest"; // Importing Supertest to make HTTP requests
import app from "../server.js"; // Importing the Express app (server) to test the API routes

describe("API Routes", () => {
  let receiptId; // Declare a variable to store the receipt ID for later tests

  // Test the POST /receipts/process route
  test("POST /receipts/process - should process receipt and return an id", async () => {
    const receiptData = {
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
          shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ", // Contains extra spaces to simulate real-world data
          price: "12.00",
        },
      ],
      total: "35.35", // Total cost of the receipt
    };

    // Sending a POST request to /receipts/process with the receipt data
    const response = await request(app)
      .post("/receipts/process")
      .send(receiptData);

    // Checking if the status code is 200 (OK)
    expect(response.status).toBe(200);

    // Checking if the response contains an 'id' property (receipt ID)
    expect(response.body).toHaveProperty("id");

    // Save the receipt ID for use in subsequent tests
    receiptId = response.body.id;
  });

  // Test the GET /receipts/:id/points route
  test("GET /receipts/:id/points - should return points for a valid receipt", async () => {
    // Sending a GET request to /receipts/:id/points, where :id is the receiptId from the previous test
    const response = await request(app).get(`/receipts/${receiptId}/points`);

    // Checking if the status code is 200 (OK)
    expect(response.status).toBe(200);

    // Checking if the response contains a 'points' property
    expect(response.body).toHaveProperty("points");

    // Ensuring that 'points' is a number
    expect(typeof response.body.points).toBe("number");
  });

  // Test the GET /receipts/:id/points route for an invalid receipt ID
  test("GET /receipts/:id/points - should return 404 for an invalid id", async () => {
    // Sending a GET request to /receipts/invalid-id/points to test an invalid receipt ID
    const response = await request(app).get("/receipts/invalid-id/points");

    // Checking if the status code is 404 (Not Found)
    expect(response.status).toBe(404);

    // Checking if the response contains the correct error message for receipt not found
    expect(response.body).toHaveProperty("error", "Receipt not found");
  });
});
