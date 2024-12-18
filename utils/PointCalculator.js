// Function to calculate total points based on various aspects of a receipt
export const calculatePoints = (receipt) => {
  let points = 0;

  // Add points based on the retailer's name
  points += calculateRetailerPoints(receipt.retailer);

  // Add points based on the total purchase amount
  points += calculateTotalPoints(receipt.total);

  // Add points based on the items purchased
  points += calculateItemPoints(receipt.items);

  // Add points based on the purchase date
  points += calculateDatePoints(receipt.purchaseDate);

  // Add points based on the purchase time
  points += calculateTimePoints(receipt.purchaseTime);

  return points; // Return the total points
};

// Function to calculate points based on the retailer's name
// Points are awarded for the number of alphanumeric characters in the retailer's name
const calculateRetailerPoints = (retailer) => {
  return retailer.replace(/[^a-zA-Z0-9]/g, "").length;
};

// Function to calculate points based on the total purchase amount
const calculateTotalPoints = (total) => {
  let points = 0;

  // Award 50 points if the total is a whole number
  if (total % 1 === 0) points += 50;

  // Award 25 points if the total is divisible by 0.25
  if (total % 0.25 === 0) points += 25;

  return points;
};

// Function to calculate points based on items purchased
const calculateItemPoints = (items) => {
  let points = Math.floor(items.length / 2) * 5; // Award 5 points for every 2 items

  // Additional points for items with specific conditions
  items.forEach((item) => {
    const descriptionLength = item.shortDescription.trim().length; // Trim whitespace and calculate description length

    // Award additional points if the description length is divisible by 3
    if (descriptionLength % 3 === 0) {
      points += Math.ceil(item.price * 0.2); // 20% of the item's price (rounded up)
    }
  });

  return points;
};

// Function to calculate points based on the purchase date
const calculateDatePoints = (date) => {
  const day = parseInt(date.split("-")[2]); // Extract the day from the date string

  // Award 6 points if the day is odd
  return day % 2 !== 0 ? 6 : 0;
};

// Function to calculate points based on the purchase time
const calculateTimePoints = (time) => {
  // Award 10 points if the purchase was made between 2 PM and 4 PM
  return time >= "14:00" && time < "16:00" ? 10 : 0;
};
