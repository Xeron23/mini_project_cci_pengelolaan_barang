import { ResponseError } from "../config/error.js";

    const errorMiddleware = async(err, req, res, next)=>{
    if(!err){
        next();
        return;
    }
    if(err instanceof ResponseError){
        res.status(err.statusCode).json({
            errors: err.message
        }).end()
    }else {
        res.status(500).json({
            errors: err.message
        }).end()
    };
};


export default errorMiddleware;