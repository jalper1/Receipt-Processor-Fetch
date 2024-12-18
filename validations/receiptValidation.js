import Joi from "joi";

export const validateReceipt = (receipt) => {
  const schema = Joi.object({
    retailer: Joi.string().required(),
    purchaseDate: Joi.string().isoDate().required(),
    purchaseTime: Joi.string()
      .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
      .required(),
    total: Joi.number().required(),
    items: Joi.array()
      .items(
        Joi.object({
          shortDescription: Joi.string().required(),
          price: Joi.number().required(),
        })
      )
      .min(1)
      .required(),
  });

  return schema.validate(receipt);
};
