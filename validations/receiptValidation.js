// Importing Joi library for schema validation
import Joi from "joi";

// Function to validate receipt data using Joi schema
export const validateReceipt = (receipt) => {
  // Defining the schema for the receipt object
  const schema = Joi.object({
    retailer: Joi.string().required(), // Retailer's name must be a string and is required
    purchaseDate: Joi.string().isoDate().required(), // Purchase date must be a valid ISO date string and is required
    purchaseTime: Joi.string()
      .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/) // Purchase time must match the pattern of HH:mm (24-hour format)
      .required(), // Time is required
    total: Joi.number().required(), // Total must be a number and is required
    items: Joi.array()
      .items(
        Joi.object({
          shortDescription: Joi.string().required(), // Each item must have a short description (string) and it is required
          price: Joi.number().required(), // Each item must have a price (number) and it is required
        })
      )
      .min(1) // Receipt must have at least one item
      .required(), // Items array is required
  });

  // Returning the validation result, which includes any validation errors
  return schema.validate(receipt);
};
