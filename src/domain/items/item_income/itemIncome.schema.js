import Joi from "joi";


const createItemIncomeSchema = Joi.object({
    item_id: Joi.number().required(),
    quantity: Joi.number().required(),
    unit_price: Joi.number().required(),
    date: Joi.date().required(),
    user_id: Joi.number().required()

});

const idItemIncomeSchema = Joi.number().required();


const destroyItemIncomeSchema = Joi.object({
    id: Joi.number().required(),
    item_id: Joi.number().required(),
})

export {createItemIncomeSchema, idItemIncomeSchema, destroyItemIncomeSchema};