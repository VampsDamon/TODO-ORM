import { PrismaClient } from "@prisma/client";
import {Todo} from "../types";
const prisma=new PrismaClient();

export const createTodo=async({title,description}:Todo,userId:number):Promise<Todo>=>{
  return await prisma.todos.create({
    data:{
        userId,
        title,
        description
    }
  })
}


export const updateTodo=async(todoId:number):Promise<Todo>=>{
    return await prisma.todos.update({
        where:{
            id:todoId,
        },
        data:{
            done:true
        }
    })
}

export const getTodoByUserId=async(userId:number):Promise<Todo[]>=>{
    return await prisma.todos.findMany({
        where:{
            userId
        }
    }) 
}


export const deleteTodo = async (todoId: number): Promise<Todo> => {
  return await prisma.todos.delete({
    where: {
      id: todoId,
    }
  });
};


