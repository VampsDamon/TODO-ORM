import {z} from "zod"

export const userSchema=z.object({
   email:z.string().email(),
   password:z.string().min(6,"Password must 6 or more characters"),
   username:z.string().min(6,"Username must 6 or more characters").optional()
})

export const todoSchema=z.object({
    
    title:z.string().nonempty("Title is required"),
    description:z.string().nonempty("Description is required")
})





