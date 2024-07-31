import Joi from 'joi';
import { usernameSchema, emailSchema, passwordSchema } from './commonSchema.js';
const userSchema = Joi.object({
  username: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
});

export default userSchema;
