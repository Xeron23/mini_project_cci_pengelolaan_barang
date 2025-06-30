import { login, logout, refreshToken, register } from "./auth.service.js";
import "dotenv/config";
import jwt from "jsonwebtoken"

const loginController = async(req, res, next)=>{
    try {
        const data = req.body;
        const user = await login(data);

        
        res.cookie('jwt', user.refreshToken, {httpOnly: true, maxAge:  24*60*60*1000})
        res.status(200).json({
            message: "succesfully login",
            data: user
        });
    } catch (error) {
        next(error)
    }
}

const refreshController = async(req, res, next)=>{
    try {
        const token = req.cookies;

        const refresh =await refreshToken(token || null);
        res.status(200).json(refresh)
    } catch (error) {
        next(error);
    }
}


const registerController = async(req, res, next)=>{
    try {
        const data = req.body;
        const user = await register(data);

        res.status(200).json({
            message: "succesfully register",
            data: user
        });
    } catch (error) {
        next(error)
    }
}


const logoutController = async(req, res, next)=>{
    try {
        const user = req.user
        const out = await logout(user);
        res.clearCookie('jwt',{ httpOnly: true, sameSite: 'None', secure: true })
        res.status(200).json({
            data: out,
        });
    } catch (error) {
        next(error)
    }
}

export {loginController, registerController, refreshController, logoutController};