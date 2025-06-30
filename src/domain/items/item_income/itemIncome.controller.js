import sucessResponse from "../../../utils/success_response.js";
import { destroy, index, showItem, store } from "./itemIncome.service.js";


const indexItemIncomeController =  async(req, res, next)=>{
    try {
        const items = await index();
        return sucessResponse(res, 200, items, "get all item income")
    } catch (error) {
        next(error)
    }
};

const showItemIncomeController  = async(req, res,next)=>{
    try {
        const {id} = req.params;
        const item = await showItem(id);
        return sucessResponse(res, 200, item, "get all item income by item")
    } catch (error) {
        next(error)
    }
};

const createItemIncomController = async(req, res, next)=>{
    try {
        const {item_id, quantity, unit_price, date, user_id} = req.body;
        const item = await store({item_id, quantity, unit_price, date, user_id});
        return sucessResponse(res, 201, item, "succesfully create item income")
        
    } catch (error) {
        next(error)
    }
}


const deleteItemIncomeController = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const {item_id} = req.body;
        const item = await destroy(id, item_id);
        res.status(204).end();
    } catch (error) {
        next(error)
    }
}

export {indexItemIncomeController, createItemIncomController, deleteItemIncomeController, showItemIncomeController}