import prisma from "../../../config/db.js";
import { ResponseError } from "../../../config/error.js";
import validate from "../../../utils/validation.js";
import { update } from "../items.service.js";
import { createItemIncomeSchema, destroyItemIncomeSchema, idItemIncomeSchema } from "./itemIncome.schema.js";


const index = async()=>{
        const itemIncome = await prisma.itemIncome.findMany();
        return itemIncome;
}


const showItem = async(id)=>{
        const validId = validate(idItemIncomeSchema, id);
        const item = await prisma.itemIncome.findMany({
            where: {
                item_id: validId
            }
        });
        
        if(!item.length){
            throw new ResponseError("item income not found", 404);
        }
        
        return item;
}

const store = async({item_id, quantity, unit_price, date, user_id})=>{
        const validItemIncome = validate(createItemIncomeSchema, {item_id, quantity, unit_price, date, user_id});

        const checkItemId = await prisma.item.findUnique({
            where: {
                id: validItemIncome.item_id
            }
        })

        if(!checkItemId){
            throw new ResponseError("item not exists", 404)
        }

        const create = await prisma.itemIncome.create({
            data: {
                item_id: validItemIncome.item_id,
                quantity: validItemIncome.quantity,
                unit_price: validItemIncome.unit_price,
                date: validItemIncome.date,
                user_id: validItemIncome.user_id,
                total_price: validItemIncome.unit_price*validItemIncome.quantity,
            }
        });

        if(!create){
            throw new ResponseError("cannot create item income", 500)
        }

        
        await update({
            id: checkItemId.id,
            name: checkItemId.name,
            description: checkItemId.description,
            category_id: checkItemId.category_id,
            current_stock: checkItemId.current_stock+ validItemIncome.quantity,
        })

        return create;
}


const destroy = async(id, item_id)=>{
        const validId = validate(destroyItemIncomeSchema, {id, item_id});
        
        const checkItemId = await prisma.item.findUnique({
            where: {
                id: validId.item_id
            }
        })

        if(!checkItemId){
            throw new ResponseError("item not exists", 404)
        }

        const checkItemIncomeId = await prisma.itemIncome.findUnique({
            where: {
                id: validId.id
            }
        })

        if(!checkItemIncomeId){
            throw new ResponseError("item income not exists", 404)
        }

        const itemIncome = await prisma.itemIncome.delete({
            where: {
                id: validId.id
            }
        });

        if(!itemIncome){
            throw new ResponseError("cannot delete item income", 500);
        }

        await update({
            id: checkItemId.id,
            name: checkItemId.name,
            description: checkItemId.description,
            category_id: checkItemId.category_id,
            current_stock: checkItemId.current_stock - checkItemIncomeId.quantity,
        })

        return "succesfully delete item income"
}


export {index, showItem, store, destroy} 


