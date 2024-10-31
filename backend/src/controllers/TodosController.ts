import { Request, Response, NextFunction } from "express";
import { todoSchema } from "../schemas";
import {
  createTodo,
  deleteTodo,
  updateTodo,
  getTodoByUserId,
  getTodo,
} from "../db/TODO";
import {   ZodError as CustomZodError, ForbiddenError  } from "../Errors/CustomError"
import { ZodError } from "zod";

export const createTodoByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   try {
     const {title,description}=todoSchema.parse(req.body);
     
     const userId:number=Number(req.headers.userid);
     const todo = await createTodo({ title, description }, userId);
      res.json({message:"Todo Created",todo})
   } catch (error) {
     if (error instanceof ZodError) {
       return next(new CustomZodError(error));
     }
     next(error);
   }
};

export const deleteTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   try {
    const todoId:number=Number(req.params.todoId);
    const todoIdTodo = await getTodo(todoId);
    if (!todoIdTodo && !todoId) throw new ForbiddenError("Todo Id not Found!");
    await deleteTodo(todoId);
    res.json({message:"Todo deleted successfully",todoId})
   } catch (error) {
    next(error)
   }

};

export const updateTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoId: number = Number(req.params.todoId);
    const todoIdTodo=await getTodo(todoId)
    if (!todoIdTodo || !todoId) throw new ForbiddenError("Todo Id not Found!");
   
   const todo= await updateTodo(todoId);
    res.json({ message: "Todo Updated successfully", todo });
  } catch (error) {
    next(error)
  }
};

export const getTodosByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   try {
    const userId: number = Number(req.headers.userid);
    const todos=await getTodoByUserId(userId);
    res.json({todos})
   } catch (error) {
    next(error)
   }
};
