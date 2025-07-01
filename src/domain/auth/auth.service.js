import "dotenv/config";

import {promisify} from "util"

import validate from "../../utils/validation.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { loginSchema, registerSchema, userLogoutSchema } from "./auth.schema.js";
import prisma from "../../config/db.js";
import { ResponseError } from "../../config/error.js";
import { decode } from "punycode";

// secret 
const accessTokenSecret= '92e4c39b1338d60f0bf1e6758655a6f5f52c1d54afe52c7d860c88603ec9e5e6096b790bfde7b82246f4f27c906c5275937b2cad1ab0951d927ff2f514bc1d9c'
const refreshTokenSecret= '09fbd8a822d60b471ae19a479d49c522f6de12a598c5dc507665167a18420faa2e82c231328690f17b8e6a0b3f4095dd142726b2fe27e180c8cb0980bf421638'

const login = async(data)=>{
        const user = validate(loginSchema, data);

        const checkUsername = await prisma.user.findFirst({
            where: {
                username: user.username
            }
        });
        
    
    
        if(!checkUsername){
            throw new ResponseError("username or password wrong", 401)
        }
    
    
        const checkPassword = await bcrypt.compare(user.password, checkUsername.password);
    
        if(!checkPassword){
            throw new ResponseError("username or password wrong", 401)
        }
    
        const accessToken = jwt.sign(
            {
                username: checkUsername.username,
                name: checkUsername.name
            },
            accessTokenSecret || process.env.ACCESS_TOKEN_SECCRET
            , {expiresIn: '150s'}
        )
    
        const refreshToken = jwt.sign(
            {
                username: checkUsername.username,
                name: checkUsername.name
            },
            refreshTokenSecret || process.env.REFRESH_TOKEN_SECCRET,
            {expiresIn: '1d'}
        )
    
        return {
            data: {
                name: checkUsername.name

            },
            accessToken,
            refreshToken
        }
        
}


const register = async(data)=>{
    const user = validate(registerSchema, data);
    
    const checkUsername = await prisma.user.findFirst({
        where: {
            username: user.username
        }
    });
    console.log(checkUsername);
    
    if(checkUsername){
        throw new ResponseError("username already exists", 409)
    }

    user.password = await bcrypt.hash(data.password, 10);
    const create = await prisma.user.create({
        data: {
            name: user.name,
            username: user.username,
            password: user.password
        }
    })

    return create.username;
}

const logout = async(username)=>{
        const user = validate(userLogoutSchema, username);
        const checkUserExists = await prisma.user.findFirst({
            where: {
                username: user
            }
        })
        if(!checkUserExists){
            throw new ResponseError("user doesn't exists", 404)
        }
        return "ok"
    }
    
    
const refreshToken = async(token)=>{
    const verifyAsync = promisify(jwt.verify);
    if (!token.jwt) {
        throw new ResponseError("Forbidden", 403);
    }

    let decoded;
    try {
        decoded = await verifyAsync(token.jwt, process.env.REFRESH_TOKEN_SECCRET);
    } catch (err) {
        throw new ResponseError("Forbidden", 403);
    }

    const newAccessToken = jwt.sign(
        { 
            username: decoded.username ,
            user: decode.name
        },
        process.env.ACCESS_TOKEN_SECCRET,
        { expiresIn: '100s' }
    );

    return {
        accessToken: newAccessToken
    };
}

export {login, register, logout, refreshToken}