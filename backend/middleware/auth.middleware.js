import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) =>{
    const token =
    req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // after decoding we will get only that info that we passed during generating token

        const user = await userModel.findById(decoded._id);
        req.user = user;

        return next();

    } catch (error) {
        return res.status(401).json({messge: 'Unauthorized'});
    }
}   