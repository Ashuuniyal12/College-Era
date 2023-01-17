import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        
        if(token){
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.body._id = decode?.id;
        }
        next();
    }catch(error){
        console.log(error);
    }
}

export default authMiddleware;