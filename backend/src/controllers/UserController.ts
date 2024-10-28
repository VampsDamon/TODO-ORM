import { verify } from "crypto";
import { createUser, getUserByEmail, getUserById } from "../db/User";
import { userSchema } from "../schemas";
import { AuthenticatedRequest } from "../types";
import { hashPassword, verifyPassword } from "../utility/hash";
import { generateToken } from "../utility/jwt";
import { NextFunction, Response } from "express";
import { BadRequestError, DuplicateError, UnauthorizedError } from "../Errors/CustomError";
import { ZodError as CustomZodError } from "../Errors/CustomError";
import { ZodError as ZodValidationError } from "zod";
import { Request } from "express";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = userSchema.parse(req.body);
    if (!username ) {
      throw new BadRequestError("Username must be provided")
    }
    console.log(username, email, password);
    const hashedPassword = await hashPassword(password);

    const existingUser = await getUserByEmail(email);

    

    if (existingUser) {
      throw new BadRequestError("Email ID already in use");
    }

    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      const token = generateToken(user?.id || 1 );
      res.json({
        message: "User registered successfully",
        token,
      });
    } else {
      throw new DuplicateError("User already registered");
    }
  } catch (error) {
    if (error instanceof ZodValidationError) {
      return next(new CustomZodError(error));
    }
    next(error);
  }
};

export const login = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { password, email } = userSchema.parse(req.body);
    
    const user=await getUserByEmail(email);
  
    if(user){
      const verifiedPassword=await verifyPassword(password,user?.password)
      
      if(verifiedPassword){
        const token=generateToken(user?.id||1)
        res.json({"message":"Login successful",token})
      }else{
        throw new UnauthorizedError("Invalid Password")
      }
      
    }else{
      throw new UnauthorizedError("Invalid Email")
    }
  
  } catch (error) {
     if (error instanceof ZodValidationError) {
       return next(new CustomZodError(error));
     }
     next(error)
  }
};


export const getUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.headers.userid);
    const user = await getUserById(userId);
    if(user){
      res.json({user})
    }else{
      throw new UnauthorizedError("Unauthorized User!") 
    }
    
  } catch (error) {
    next(error)
  }
};