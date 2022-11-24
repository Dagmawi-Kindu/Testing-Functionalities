import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
const multer=require('multer')
import { deleteUser, updateUser, createUser, getUser, makePayment, uploadUserPhoto, resizeUserPhoto} from "../controllers/UserController"
import { getNote, createNote, updateNote, deleteNote } from "../controllers/NoteController";
const express = require('express');
import { verifyToken, verifyAdmin, verifyUser } from "../middlewares/tokenValidation.middleware"




const router = express.Router();

router.get('/home/get', verifyToken, verifyAdmin, getUser);
router.get('/home/getNote', verifyToken, verifyUser, getNote);
router.post('/home/:id/createNote', verifyToken, verifyUser, createNote);
router.post('/home/create', verifyToken, uploadUserPhoto,resizeUserPhoto,createUser);
router.post('/home/pay/:id', makePayment);
router.put('/home/update/:id', uploadUserPhoto,updateUser);
router.put('/home/:id/updateNote', verifyToken, verifyUser, updateNote);
router.delete('/home/delete/:id', deleteUser);
router.delete('/home/:id/deleteNote', verifyToken, verifyUser, deleteNote);

         
export {
    router as userRouter
}

    