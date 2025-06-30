import e from "express";
import { createCategoryController, deleteCategoryController, getAllCategoryController, showCategoryController, updateCategoryController } from "./category.controller.js";

const routerCategory = e.Router();

routerCategory.get("/", getAllCategoryController);
routerCategory.get("/:id", showCategoryController);
routerCategory.post("/", createCategoryController);
routerCategory.delete("/:id", deleteCategoryController);
routerCategory.put("/:id", updateCategoryController);

export default routerCategory;