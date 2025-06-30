import Joi from "joi";


const userSchema = Joi.object({
    usernama: Joi.string().min(6).max(25),
    password: Joi.string().min(6).max(50),
})

const userLogoutSchema = Joi.string().required();

export {userSchema, userLogoutSchema}