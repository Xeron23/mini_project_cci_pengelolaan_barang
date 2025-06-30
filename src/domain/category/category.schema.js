import Joi from "joi";


const createCategorySchema = Joi.string().min(2).max(50).required();

const idCategorySchema = Joi.number().required();


const updateCategorySchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(2).max(50).required()
})

export {createCategorySchema, idCategorySchema, updateCategorySchema};
