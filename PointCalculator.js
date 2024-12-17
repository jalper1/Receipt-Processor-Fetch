function generateReceiptPoints(receiptData) {
  var points = 0; // variable to track points

  points += receiptData.retailer.replace(/[^a-zA-Z0-9]/g, "").trim().length; // add up alphanumeric characters without symbols

  // add 50 points if total is a round dollar amount with no cents
  if (receiptData.total % 1 === 0) {
    points += 50;
  }

  // add 25 points if total is a multiple of 0.25
  if (receiptData.total % 0.25 === 0) {
    points += 25;
  }

  points += Math.floor(receiptData.items.length / 2) * 5; // add 5 points for every 2 items

  // add 20% of price as points for every item with a description that has a length that's a multiple of 3
  for (var i = 0; i < receiptData.items.length; i++) {
    if (receiptData.items[i].shortDescription.trim().length % 3 === 0) {
      points += Math.ceil(receiptData.items[i].price * 0.2);
    }
  }

  // add 6 points if purchase date is odd
  if (parseInt(receiptData.purchaseDate.split("-")[2]) % 2 !== 0) {
    points += 6;
  }

  // add 10 points if purchase time is between 2pm and 4pm
  if (
    receiptData.purchaseTime > "14:00" &&
    receiptData.purchaseTime < "16:00"
  ) {
    points += 10;
  }

  return points; // return total points
}

export default generateReceiptPoints;
