import { usernameSchema, emailSchema, passwordSchema } from './commonSchema.js';

const vendorSchema = Joi.object({
  username: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
  description: Joi.string(),
  contact: Joi.object({
    email: emailSchema,
    phone: Joi.string(),
  }),
  location: Joi.object({
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    postalCode: Joi.string(),
  }),
  website: Joi.string(),
  products: Joi.array().items(Joi.objectId()),
  gstin: Joi.string(),
  pan: Joi.string(),
  categories: Joi.array().items(Joi.string()),
});

export default vendorSchema;
