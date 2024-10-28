import {Request,Response,NextFunction} from "express"
import { verifyToken } from "../utility/jwt";
import { AuthenticatedRequest } from "../types";
import { UnauthorizedError } from "../Errors/CustomError";



export const jwtAuthMiddleware=(req:AuthenticatedRequest,res:Response,next:NextFunction):void=>{
  const authHeader=req.headers.authorization;
  const token=authHeader && authHeader.split(" ")[1];
  const userId=req.headers.userid;
  if (authHeader?.split(" ")[0] != "Bearer")
    throw new UnauthorizedError("Invalid Authorization Token");
    if (!token) {
      res.status(401).json({ message: "Authorization token required" });
      return;
    }

  const decoded=verifyToken(token);
  
  if(decoded?.userId!=userId){
    throw new UnauthorizedError("Invalid Authorization Cookies"); 
  }

  if(!decoded){
    res.status(401).json({
        message:"Invalid or Expired Token"
    })
    return ;
  }
  
  next();
}