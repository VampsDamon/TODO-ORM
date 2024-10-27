import {Request, Response, Router} from 'express'
import { registerUser } from '../controllers/UserController';

export const userRouter=Router();


userRouter.get("/",(req:Request,res:Response)=>{
    res.send("Hello ALl Working")
})

userRouter.post("/register",registerUser);

