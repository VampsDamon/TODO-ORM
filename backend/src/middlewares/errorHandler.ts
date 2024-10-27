import { Request,Response,NextFunction } from "express";

interface CustomError extends Error{
    statusCode?:number,
    details?:string
}

export const errorHandler=(err:CustomError,req:Request,res:Response,next:NextFunction):void=>{
    console.error(err);

    const statusCode=err.statusCode||500;
    const message=err.details|| "Internal Server Error"

    res.status(statusCode).json({
        success:false,
        message,
        details:err.details||null
    });
};

