import { Request } from "express"
import { z } from "zod"; 
import { todoSchema, userSchema } from "../schemas";


export type User=z.infer<typeof userSchema>

// export interface Todo{
//     id?:number,
//     userId:number,
//     title:string,
//     description:string
//     done:boolean
// }

export type Todo=z.infer<typeof todoSchema>
export interface AuthenticatedRequest extends Request {
  userId?: number;
}

