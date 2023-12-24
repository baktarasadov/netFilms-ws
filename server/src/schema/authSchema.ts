import Joi from "joi";

export const registerSchema = Joi.object({
    fullname: Joi.string().min(3).max(16).required(),
    email: Joi.string().email().min(8).max(30).required(),
    password: Joi.string().min(8).max(30).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/),

});

export const loginSchema = Joi.object({
    email: Joi.string().email().min(8).max(30).required(),
    password: Joi.string().min(8).max(30).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
    ,
});


