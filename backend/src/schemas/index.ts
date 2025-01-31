import {z} from "zod"

export const userSchema=z.object({
     id:z.number().optional(),
    email:z.string().email(),
   password:z.string().min(6,"Password must 6 or more characters"),
   username:z.string().min(6,"Username must 6 or more characters").optional()
})

export const todoSchema=z.object({
    id:z.number().optional(),
    title:z.string().nonempty("Title is required"),
    description:z.string().nonempty("Description is required"),
    userId:z.number().optional(),
    done:z.boolean().optional()
})





