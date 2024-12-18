export const calculatePoints = (receipt) => {
  let points = 0;

  points += calculateRetailerPoints(receipt.retailer);
  points += calculateTotalPoints(receipt.total);
  points += calculateItemPoints(receipt.items);
  points += calculateDatePoints(receipt.purchaseDate);
  points += calculateTimePoints(receipt.purchaseTime);

  return points;
};

const calculateRetailerPoints = (retailer) => {
  return retailer.replace(/[^a-zA-Z0-9]/g, "").length;
};

const calculateTotalPoints = (total) => {
  let points = 0;
  if (total % 1 === 0) points += 50;
  if (total % 0.25 === 0) points += 25;
  return points;
};

const calculateItemPoints = (items) => {
  let points = Math.floor(items.length / 2) * 5;

  items.forEach((item) => {
    const descriptionLength = item.shortDescription.trim().length;
    if (descriptionLength % 3 === 0) {
      points += Math.ceil(item.price * 0.2);
    }
  });

  return points;
};

const calculateDatePoints = (date) => {
  const day = parseInt(date.split("-")[2]);
  return day % 2 !== 0 ? 6 : 0;
};

const calculateTimePoints = (time) => {
  return time >= "14:00" && time < "16:00" ? 10 : 0;
};
