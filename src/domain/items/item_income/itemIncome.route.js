import e from "express";
import { createItemIncomController, deleteItemIncomeController, indexItemIncomeController, showItemIncomeController } from "./itemIncome.controller.js";
import authMiddelware from "../../../middleware/auth-middleware.js";

const RouterItemIncome = e.Router();

// auth middleware

RouterItemIncome.get('/', indexItemIncomeController);
RouterItemIncome.get('/item/:id', showItemIncomeController);
RouterItemIncome.post('/', createItemIncomController);
RouterItemIncome.delete('/:id', deleteItemIncomeController);


export default RouterItemIncome;