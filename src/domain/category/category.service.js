import prisma from "../../config/db.js";
import { ResponseError } from "../../config/error.js";
import validate from "../../utils/validation.js";
import { createCategorySchema, idCategorySchema, updateCategorySchema } from "./category.schema.js";




const index = async () => {
  const categories = await prisma.category.findMany();

  return categories;
}


const show = async (id) => {
    const idValidation = validate(idCategorySchema, id);
    const category = await prisma.category.findUnique({
      where: { id: idValidation},
    });

    if (!category) {
      throw new ResponseError('category not found', 404);
    }
    return category;
}

const store = async (name) => {
    const categoryValidation = validate(createCategorySchema, name);
    const category = await prisma.category.create({
      data: {
        name: categoryValidation,
      },
    });

    return category;
}


const update = async (id, name) => {
    const updateValidation = validate(updateCategorySchema, {id, name});
    const checkExistsCategory = await prisma.category.findUnique({
        where: { id: updateValidation.id },
    });
    if (!checkExistsCategory) {
        throw new ResponseError("Category not found", 404);
    }
    const category = await prisma.category.update({
      where: { id: updateValidation.id },
      data: { name: updateValidation.name },
    });

    if(!category){
      throw new ResponseError('category not updated', 500)
    }

    return category;
}

const destroy = async (id) => {
    const idValidation = validate(idCategorySchema, id);
    const checkExistsCategory = await prisma.category.findUnique({
        where: { id: idValidation },
    });
    if (!checkExistsCategory) {
        throw new ResponseError("Category not found", 404);
    }

    const category = await prisma.category.delete({
        where: { id: id },
    });

    if (!category) {
      throw new ResponseError("Category not deleted", 500);
    }

    return "ok";
}


export {store, index, show, update, destroy};