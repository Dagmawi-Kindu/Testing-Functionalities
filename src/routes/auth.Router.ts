const express = require("express")
const authRouter = express.Router()
import {sign_in,sign_up} from "../controllers/auth.Controller"


authRouter.post("/signup",sign_up)
authRouter.post("/signin",sign_in)


export {
    authRouter
}