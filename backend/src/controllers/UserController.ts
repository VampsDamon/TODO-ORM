import { verify } from "crypto";
import { createUser,getUserByEmail } from "../db/User";
import { userSchema } from "../schemas";
import { AuthenticatedRequest } from "../types";
import { hashPassword, verifyPassword } from "../utility/hash";
import { generateToken } from "../utility/jwt";
import { NextFunction, Response } from "express";
import { BadRequestError, DuplicateError } from "../Errors/CustomError";
import { ZodError as CustomZodError } from "../Errors/CustomError";
import { ZodError as ZodValidationError } from "zod";
import { Request } from "express";

export const registerUser = async (
  req: Request,
  res: Response,
  next:NextFunction
) => {
  try {
    console.log(req.body)
    const { username, email, password } = userSchema.parse(req.body);
    console.log(username, email, password);
    const hashedPassword = await hashPassword(password);

    const existingUser = await getUserByEmail(email);
    
    if(existingUser){
         throw new BadRequestError("Email ID already in use")
    }

    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    if(user){
        const token = generateToken(user?.id || 1, username);
        console.log(user)
        res.json({
          message: "User registered successfully",
          token,
        });
    }else{
        throw new DuplicateError("User already registered")
    }
  } catch (error) {
    console.log(error)
    if(error instanceof ZodValidationError ){
        return next(new CustomZodError(error) )
    } 
    next(error)
  }
};
