import {Request,Response,NextFunction} from "express"
import { verifyToken } from "../utility/jwt";
import { AuthenticatedRequest } from "../types";



export const jwtAuthMiddleware=(req:AuthenticatedRequest,res:Response,next:NextFunction):void=>{
  const authHeader=req.headers.authorization;
  const token=authHeader && authHeader.split(" ")[1];

  if(!token){
     res.status(401).json({message:"Authorization token required"});
     return ;
  }

  const decoded=verifyToken(token);

  if(!decoded){
    res.status(401).json({
        message:"Invalid pr Expired Token"
    })
    return ;
  }

  req.userId=decoded.userId;
  req.username=decoded.username;
  next();
}