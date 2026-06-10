import * as Joi from 'joi';

// Esquema de validación para variables de entorno
export const envValidationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().min(32).required(),
    PUBLIC_API_URL: Joi.string().uri().optional(),
});
