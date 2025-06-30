import { ResponseError } from "../../config/error.js";
import sucessResponse from "../../utils/success_response.js";
import { destroy, index, show, store, update } from "./items.service.js";

const createItemController = async(req, res, next)=>{
    try {
        const {name, description, category_id, current_stock} = req.body;
        
        const create = await store({name, description, category_id, current_stock})
        return sucessResponse(res, 201, create, "succesfully create item")
    } catch (error) {
        next(error)
    }
};


const getAllItemController = async(req, res, next)=>{
    try {
        const item = await index();
        return sucessResponse(res, 200, item, "get all item")
    } catch (error) {
        next(error)
    }
}


const getItemController = async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id)
        const item = await show(id);
        return sucessResponse(res, 200, item, "get item by id")
        
    } catch (error) {
        next(error)
    }
};


const updateItemController = async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const {name, description, category_id, current_stock} = req.body;
        if(!name || !description || !category_id || !current_stock){
            throw new ResponseError("please fulled the input")
        }
        const updateItem = await update({id, name, description, category_id, current_stock})
        return sucessResponse(res, 200, updateItem, "succesfullt update item")
        
    } catch (error) {
        next(error)
    }
};


const deleteItemController = async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        await destroy(id);
        res.status(200).end();
    } catch (error) {
        next(error)
    }
};

export {getAllItemController, getItemController, deleteItemController, updateItemController, createItemController}