require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
import { Auth } from "../entity/auth.entity"
import { AppDataSource } from "../data-source"

export const sign_in = async (req, res, next) => {
    const authRepository = AppDataSource.getRepository(Auth)

    let foundAuth = await authRepository.findOne({
        where: {
            username:req.body.username
        }
    })
    if(!foundAuth)
        res.status(404).json({
        message:"User not found"
        })
    const isPasswordCorrect = await bcrypt.compare(req.body.password, foundAuth.password) 
    if (!isPasswordCorrect)
        
        res.status(404).json({
            message: "Username or password isnot correct"
        })
    let token = jwt.sign({
        id: foundAuth.id,
        isAdmin:foundAuth.isAdmin
    }, process.env.JWT_KEY)
    let { password, ...otherCredentials } = foundAuth
    res.status(200).json({
        userData: otherCredentials,
        access_token:token
    })

}
export const sign_up = async (req, res, next) => {
    const authRepository = AppDataSource.getRepository(Auth)
   
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    let auth = new Auth()
    auth.username = req.body.username    
    auth.password = hash
    auth.isAdmin=req.body.isAdmin
    
    await authRepository.save(auth)
    res.status(200).json({
        message:"User added successfully"
    })
    
}