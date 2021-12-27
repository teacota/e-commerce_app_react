import Joi from "joi";

export const schema = Joi.object({
  password: Joi.string().min(8),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});
