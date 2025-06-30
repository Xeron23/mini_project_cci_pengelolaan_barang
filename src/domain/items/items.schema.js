import Joi from "joi";


const createItemSchema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    description: Joi.string().optional(),
    category_id: Joi.number().required(),
    current_stock: Joi.number().required(),
});

const idItemSchema = Joi.number().required();

const updateItemSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(200).required(),
    description: Joi.string().optional(),
    category_id: Joi.number().required(),
    current_stock: Joi.number().required(),
});

export {createItemSchema, idItemSchema, updateItemSchema};
