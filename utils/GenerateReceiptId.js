// define function to get random id for receipt
function generateReceiptId() {
  return (
    Math.random().toString(36).substring(2, 10) + // generate random string of 8 characters
    "-" +
    Math.random().toString(36).substring(2, 6) + // generate random string of 4 characters
    "-" +
    Math.random().toString(36).substring(2, 6) + // generate random string of 4 characters
    "-" +
    Math.random().toString(36).substring(2, 6) + // generate random string of 4 characters
    "-" +
    Math.random().toString(36).substring(2, 12) + // generate random string of 12 characters
    Math.random().toString(36).substring(2, 4)
  );
}

export { generateReceiptId };
