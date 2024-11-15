import AppError from "../../utils/ErrorHandlers/AppError.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '../../models/userModel.js'
import File from "../../models/fileModel.js"

export const isLoggedIn = async (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        return next(new AppError(401, "Authentication Required"));
    }

    let validateCookieToken = await jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    if (!validateCookieToken || !validateCookieToken._id) {
        return next(new AppError(403, "Invalid Token"));
    }

    let user = await User.findById(validateCookieToken._id).select("-password").populate("files");
    if (!user) {
        return next(new AppError(403, "Invalid Token, No User Found"));
    }
    req.currentUser = user;
    return next();
}


export const isFileOwner = async (req,res,next) =>{
    let { id } = req.params;
    let file = await File.findById(id);
    if(!file){
        return next(new AppError(404,"No File Found"));
    }

    if(!file.owner.equals(req.currentUser._id)){
        return next(new AppError(409,"Access Denied"));
    }

    return next();
}