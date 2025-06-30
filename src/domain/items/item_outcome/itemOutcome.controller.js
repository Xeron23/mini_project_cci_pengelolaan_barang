import sucessResponse from "../../../utils/success_response.js";
import { destroy, index, showItem, store } from "./itemOutcome.service.js";


const indexItemOutcomeController =  async(req, res, next)=>{
    try {
        const items = await index();
        return sucessResponse(res, 200, items, "get all item outcome")
    } catch (error) {
        next(error)
    }
};

const showItemOutcomeController  = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const item = await showItem(id);
        return sucessResponse(res, 200, item, "get item otucome by item id")
    } catch (error) {
        next(error)
    }
};

const createItemOutcomeController = async(req, res, next)=>{
    try {
        const {item_id, quantity, reason, date} = req.body;
        const item = await store({item_id, quantity, reason, date});
        return sucessResponse(res, 201, item, "succesfully create item outcome")
    } catch (error) {
        next(error)
    }
}


const deleteItemOutcomeController = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const {item_id} = req.body;
        await destroy(id, item_id);
        res.status(204).end();
    } catch (error) {
        next(error)
    }
}

export {indexItemOutcomeController, createItemOutcomeController, deleteItemOutcomeController, showItemOutcomeController}