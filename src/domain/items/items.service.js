import prisma from "../../config/db.js";
import { ResponseError } from "../../config/error.js";
import validate from "../../utils/validation.js";
import { createItemSchema, idItemSchema, updateItemSchema } from "./items.schema.js";




const index = async () => {
    const items = await prisma.item.findMany();
    return items;
}


const show = async (id) => {
    const idValidation = validate(idItemSchema, id);
    
    const item = await prisma.item.findUnique({
      where: { id: idValidation},
    });
    
    if (!item) {
      throw new ResponseError('item not found', 404);
    }
    return item;
}

const store = async ({name, description, category_id, current_stock}) => {
    const itemValidation = validate(createItemSchema, {name, description, category_id, current_stock});

    const checkCategoryId = await prisma.category.findUnique({
        where: {
            id: itemValidation.category_id
        }
    });

    if(!checkCategoryId){
        throw new ResponseError("Category not exists", 404)
    }

    const item = await prisma.item.create({
      data: {
        name: itemValidation.name,
        description: itemValidation.description,
        category_id: itemValidation.category_id,
        current_stock: itemValidation.current_stock,
      },
    });
    
    return item;
}


const update = async ({id, name, description, category_id, current_stock}) => {
    const itemValidation = validate(updateItemSchema, {id, name, description, category_id, current_stock});

    const checkCategory = await prisma.category.findUnique({
        where: {
            id: itemValidation.category_id
        }
    });

    if(!checkCategory){
        throw new ResponseError("Category not exists", 404)
    }
    
    const checkExistsItem = await prisma.item.findUnique({
        where: { id: itemValidation.id },
    });
    if (!checkExistsItem) {
        throw new ResponseError("item not exists", 404);
    }

    const item = await prisma.item.update({
        where: { id: itemValidation.id },
        data: {
            name: itemValidation.name,
            description: itemValidation.description,
            category_id: itemValidation.category_id,
            current_stock: itemValidation.current_stock,
      },
    });

    if(!item){
      throw new ResponseError('item not updated', 500)
    }

    return item;
}

const destroy = async (id) => {
    const idValidation = validate(idItemSchema, id);

    const checkExistsItem = await prisma.item.findUnique({
        where: { id: idValidation },
    });

    if (!checkExistsItem) {
        throw new ResponseError("Item not found", 404);
    }

    await prisma.itemIncome.deleteMany({
        where: {
            item_id: id
        }
    });

    await prisma.itemOutcome.deleteMany({
        where: {
            item_id: id
        }
    });


    const item = await prisma.item.delete({
        where: { id: idValidation },
    });

    if (!item) {
      throw new ResponseError("Item not deleted", 500);
    }

    return "succesfully delete item";
}


export {store, index, show, update, destroy};