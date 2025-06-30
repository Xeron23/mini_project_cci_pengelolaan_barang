import jwt from "jsonwebtoken"
import "dotenv/config";


const authMiddelware = async(req, res, next)=>{
    const authHeader = req.get('Authorization');
    const Token = authHeader?.split(' ')[1]; // Ambil hanya tokennya

    if(!Token){
        return res.status(401).json({
            errors: "Unauthorized",
        }).end()
    }
    jwt.verify(
        Token,
        process.env.ACCESS_TOKEN_SECCRET,
        (err, decoded)=>{
            if(err){
                return res.status(401).json({
                    errors: err
                }).end()
            }
                req.user = decoded.username;
                next();
        }
    )
}

export default authMiddelware;