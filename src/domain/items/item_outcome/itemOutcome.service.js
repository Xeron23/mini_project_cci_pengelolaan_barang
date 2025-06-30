import prisma from "../../../config/db.js";
import { ResponseError } from "../../../config/error.js";
import validate from "../../../utils/validation.js";
import { update } from "../items.service.js";
import { createItemOutcomeSchema, destroyItemOutcomeSchema, idItemOutcomeSchema } from "./itemOutcome.schema.js";



const index = async()=>{
        const itemOutcome = await prisma.itemOutcome.findMany();
        return itemOutcome;
}


const showItem = async(id)=>{
        const validId = validate(idItemOutcomeSchema, id);
        const item = await prisma.itemOutcome.findMany({
            where: {
                item_id: validId
            }
        });
        
        if(!item.length){
            throw new ResponseError("item outcome not found", 404);
        } 
        
        return item;
}

const store = async({item_id, quantity, reason, date})=>{
        const validItemOutcome = validate(createItemOutcomeSchema, {item_id, quantity, reason, date});

        const checkItemId = await prisma.item.findUnique({
            where: {
                id: validItemOutcome.item_id
            }
        })

        if(!checkItemId){
            throw new ResponseError("item not exists", 404)
        }

        if(checkItemId.current_stock< quantity){
            throw new ResponseError("stock not enough", 400)
        }

        const create = await prisma.itemOutcome.create({
            data: {
                item_id: validItemOutcome.item_id,
                quantity: validItemOutcome.quantity,
                reason: validItemOutcome.reason,
                date: validItemOutcome.date,
            }
        });

        if(!create){
            throw new ResponseError("cannot create item outcome", 500)
        }

        
        await update({
            id: checkItemId.id,
            name: checkItemId.name,
            description: checkItemId.description,
            category_id: checkItemId.category_id,
            current_stock: checkItemId.current_stock - validItemOutcome.quantity,
        })

        return create;
}


const destroy = async(id, item_id)=>{
        const validId = validate(destroyItemOutcomeSchema, {id, item_id});
        
        const checkItemId = await prisma.item.findUnique({
            where: {
                id: validId.item_id
            }
        })

        if(!checkItemId){
            throw new ResponseError("item not exists", 404)
        }

        const checkItemOutcomeId = await prisma.itemOutcome.findUnique({
            where: {
                id: validId.id
            }
        })

        if(!checkItemOutcomeId){
            throw new ResponseError("item outcome not exists", 404)
        }

        const itemOutcome = await prisma.itemOutcome.delete({
            where: {
                id: validId.id
            }
        });

        if(!itemOutcome){
            throw new ResponseError("cannot delete item outcome", 500);
        }

        await update({
            id: checkItemId.id,
            name: checkItemId.name,
            description: checkItemId.description,
            category_id: checkItemId.category_id,
            current_stock: checkItemId.current_stock + checkItemOutcomeId.quantity,
        })

        return "succesfully delete item income"
}


export {index, showItem, store, destroy}


