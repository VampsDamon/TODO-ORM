import jwt from "jsonwebtoken";

const SECRET_KEY =<string> process.env.JWT_SECRET;


export const generateToken=(userId:number,username:string):string=>{
    return jwt.sign({userId,username},SECRET_KEY,{expiresIn:"1h"})
};


export const verifyToken=(token:string):{userId:number,username:string}|null=>{
   try {
    return <{ userId: number; username: string }>jwt.verify(token, SECRET_KEY); 
   } catch (error) {
      return null
   }
}
