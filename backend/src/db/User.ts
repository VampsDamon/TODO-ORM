import { PrismaClient } from "@prisma/client";
import { User, UserWithoutPassword } from "../types";
const prisma=new PrismaClient();

export const createUser=async({username,password,email}:User):Promise<User>=>{
   return  await prisma.users.create({
     data: {
       username,
       email,
       password,
     },
     select: {
       id:true,
       username:true,
       email:true,
       password:true
     },
   });  
}

export const getAllUsers=async():Promise<UserWithoutPassword[]>=>{
    return await prisma.users.findMany({
        select:{
            id:true,
            username:true,
            email:true,            
        }
    })
}

export const getUserById=async(userId:number):Promise<UserWithoutPassword | null>=>{
    return await prisma.users.findUnique({
        where:{
            id:userId
        },
        select:{
            id:true,
            username:true,
            email:true
        }
    })
}

export const getUserByEmail=async(email:string):Promise<UserWithoutPassword | null>=>{
    return await prisma.users.findUnique({
        where:{
            email
        },
        select:{
            id:true,
            username:true,
            email:true
        }
    })
}


