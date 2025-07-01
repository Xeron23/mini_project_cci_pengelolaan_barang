import Joi from "joi";


const loginSchema = Joi.object({
    usernama: Joi.string().min(6).max(25),
    password: Joi.string().min(6).max(50),
})

const registerSchema = Joi.object({
    name: Joi.string().min(4).max(30),
    usernama: Joi.string().min(6).max(25),
    password: Joi.string().min(6).max(50),
})

const userLogoutSchema = Joi.string().required();

export {loginSchema, userLogoutSchema, registerSchema}