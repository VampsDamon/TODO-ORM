import { PrismaClient } from "@prisma/client";
import { Todo } from "../types";
import { title } from "process";
const prisma = new PrismaClient();
type TodoRequired = Required<Todo>;
export const createTodo = async (
  { title, description }: Todo,
  userId: number
): Promise<TodoRequired> => {
  return await prisma.todos.create({
    data: {
      userId,
      title,
      description,
    },
  });
};

export const updateTodo = async (todoId: number): Promise<TodoRequired> => {
  const todo=await getTodo(todoId)
  return await prisma.todos.update({
    where: {
      id: todoId,
    },
    data: {
      done: !todo?.done,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      description: true,
      done: true,
    },
  });
};

export const getTodoByUserId = async (
  userId: number
): Promise<TodoRequired[]> => {
  return await prisma.todos.findMany({
    where: {
      userId,
    },
  });
};

export const deleteTodo = async (todoId: number): Promise<void> => {
  await prisma.todos.delete({
    where: {
      id: todoId,
    },
  });
};

export const getTodo=async(todoId:number):Promise<TodoRequired|null>=>{
  return await prisma.todos.findUnique({
    where:{
      id:todoId
    }
  })
}
