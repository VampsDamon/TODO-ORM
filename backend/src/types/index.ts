import { Request } from "express"

export interface User{
    id?:number
    email:string
    username:string
    password:string
}

export type UserWithoutPassword=Omit<User,"password">

export interface Todo{
    id?:number,
    userId:number,
    title:string,
    description:string
    done:boolean
}

export interface AuthenticatedRequest extends Request {
  userId?: number;
  username?: string;
}

