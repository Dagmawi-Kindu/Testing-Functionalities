import { userInfo } from "os";

require("dotenv").config()
const jwt = require('jsonwebtoken')
export const verifyToken = (req, res, next) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]
    
    if (!token) {
        return res.status(412).json({
            "message":"Token isnot found"
        })
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err)  
        return res.status(412).json({
            "message":"invalid token"
        })

        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    if (req.user.isAdmin == true)
       return  res.status(404).json({
        message:"You aren't authorized to use the functionality"
       })
    next();
};

export const verifyAdmin = async (req, res, next) => {
    if (req.user.isAdmin == false)
        return res.status(404).json({
            message: "You aren't authorized to use the functionality"
        })
    next();
};

