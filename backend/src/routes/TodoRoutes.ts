import { Request,Response,NextFunction,Router } from "express";
import { createTodoByUserId, deleteTodoById, getTodosByUserId, updateTodoById } from "../controllers/TodosController";
export const todoRouter=Router();


todoRouter.post("/create",createTodoByUserId);
todoRouter.delete("/delete/:todoId",deleteTodoById);
todoRouter.get("/update/:todoId", updateTodoById);
todoRouter.get("/",getTodosByUserId);



todoRouter.get("/testing",(req:Request,res:Response)=>{
     res.send("Todo Router Working")
})

