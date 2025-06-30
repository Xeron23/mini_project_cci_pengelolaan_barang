import e from "express";
import { createItemController, deleteItemController, getAllItemController, getItemController, updateItemController } from "./items.controller.js";

const RouterItem = e.Router();

RouterItem.get('/', getAllItemController);
RouterItem.post('/', createItemController);
RouterItem.get('/:id', getItemController);
RouterItem.put('/:id', updateItemController);
RouterItem.delete('/:id', deleteItemController);


export default RouterItem;