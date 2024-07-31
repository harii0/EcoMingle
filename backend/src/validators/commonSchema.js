import Joi from 'joi';

export const usernameSchema = Joi.string().min(3).max(30).required();
export const emailSchema = Joi.string().email().required();
export const passwordSchema = Joi.string().min(6).required();
