import e from "express";
import { createItemOutcomeController, deleteItemOutcomeController, indexItemOutcomeController, showItemOutcomeController } from "./itemOutcome.controller.js";

const RouterItemOutcome = e.Router();

// auth middleware

RouterItemOutcome.get('/', indexItemOutcomeController);
RouterItemOutcome.get('/item/:id', showItemOutcomeController);
RouterItemOutcome.post('/', createItemOutcomeController);
RouterItemOutcome.delete('/:id', deleteItemOutcomeController);


export default RouterItemOutcome;