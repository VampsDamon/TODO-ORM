import jwt from "jsonwebtoken";

const SECRET_KEY =<string> process.env.JWT_SECRET;


export const generateToken=(userId:number,userName:string):string=>{
    return jwt.sign({ userId, userName }, SECRET_KEY, { expiresIn: "7d" });
};


export const verifyToken=(token:string):{userId:number}|null=>{
   try {
    return <{ userId: number}>jwt.verify(token, SECRET_KEY); 
   } catch (error) {
      return null
   }
}
