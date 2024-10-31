import {Request, Response, Router} from 'express'
import { getUser, login, registerUser } from '../controllers/UserController';
import { jwtAuthMiddleware } from '../middlewares/auth';
import { todoRouter } from './TodoRoutes';

export const userRouter=Router();


userRouter.get("/",(req:Request,res:Response)=>{
    res.send("Hello ALl Working")
})

userRouter.post("/register",registerUser);

userRouter.post('/login',login);

userRouter.get("/info",jwtAuthMiddleware ,getUser);

userRouter.use("/todo",jwtAuthMiddleware,todoRouter)