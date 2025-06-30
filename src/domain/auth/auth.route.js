import e from "express";
import { loginController, logoutController, refreshController, registerController } from "./auth.controller.js";
import authMiddelware from "../../middleware/auth-middleware.js";

const RouterAuth = e.Router();


RouterAuth.post('/login', loginController);
RouterAuth.post('/refresh', refreshController);
RouterAuth.post('/', registerController);

RouterAuth.use(authMiddelware)
RouterAuth.delete('/logout',  logoutController);

export default RouterAuth;