import { ResponseError } from "../config/error.js";


const validate = (schema, request)=>{
    const result = schema.validate(request, { 
        abortEarly: false,
        allowUnknown: true,
    });
    
    if(result.error){
        throw new ResponseError(result.error.message, 400)
    }
    return result.value;
}

export default validate;