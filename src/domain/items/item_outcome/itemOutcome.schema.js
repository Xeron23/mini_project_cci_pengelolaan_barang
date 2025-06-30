import Joi from "joi";


const createItemOutcomeSchema = Joi.object({
    item_id: Joi.number().required(),
    quantity: Joi.number().required(),
    reason: Joi.string().required(),
    date: Joi.date().required(),

});

const idItemOutcomeSchema = Joi.number().required();


const destroyItemOutcomeSchema = Joi.object({
    id: Joi.number().required(),
    item_id: Joi.number().required(),
})

export {createItemOutcomeSchema, idItemOutcomeSchema, destroyItemOutcomeSchema};