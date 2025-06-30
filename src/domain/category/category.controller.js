import { ResponseError } from "../../config/error.js";
import sucessResponse from "../../utils/success_response.js";
import { destroy, index, show, store, update } from "./category.service.js";


const createCategoryController = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await store(name);

    // res.status(201).json(category);
    return sucessResponse(res, 201, category, "succesfullly create category")
  } catch (error) {
    next(error)
  }
}


const getAllCategoryController = async (req, res, next) => {
  try {
    const categories = await index();
    
    if (!categories || categories.length === 0) {
      throw new ResponseError("No categories found", 404)
    }
    // res.status(200).json(categories);
      return sucessResponse(res, 200, categories, "succesfullly get all category")
  } catch (error) {
    next(error)
  }
}

const showCategoryController = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const category = await show(id);

    // res.status(200).json(category);
        return sucessResponse(res, 201, category, "succesfullly get by id category")
  } catch (error) {
    next(error)
  }
}



const deleteCategoryController = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await destroy(id);
    
    // res.status(204).json({
    //   data: category
    // });
      res.status(204).end();
  }catch (error) {
    next(error)
  }
}


const updateCategoryController = async (req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const category = await update(id, name);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        // res.status(200).json(category);
            return sucessResponse(res, 200, category, "succesfullly update category")
    } catch (error) {
        next(error)
    }
}




export {  createCategoryController, 
          getAllCategoryController, 
          showCategoryController, 
          deleteCategoryController, 
          updateCategoryController
};

