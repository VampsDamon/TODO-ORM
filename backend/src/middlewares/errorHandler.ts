import { Request,Response,NextFunction } from "express";

interface CustomError extends Error{
    statuscode?:number,
    details?:string
}

export const errorHandler=(err:CustomError,req:Request,res:Response,next:NextFunction):void=>{
    console.error(err);
    
    const statusCode=err.statuscode||500;
    const message=err.message|| "Internal Server Error"

    res.status(statusCode).json({
        success:false,
        message,
        details:err.details||null
    });
};

