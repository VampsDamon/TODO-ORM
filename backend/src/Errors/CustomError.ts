import { ZodError as ZodValidationError } from "zod"

class AppError extends Error {
  public  statuscode:number

  constructor(message:string,statuscode:number){
    super(message)
    this.statuscode=statuscode

    Error.captureStackTrace(this,this.constructor)
  }
  
}

export class NotFoundError extends AppError{
    constructor(message="Not Found"){
        super(message,404)
    }
}

export class BadRequestError extends AppError{
    constructor(message="Bad Request"){
        super(message,400)
    }
}

export class UnauthorizedError extends AppError{
    constructor(message="Unauthorized Request"){
        super(message,401)
    }
}

export class ForbiddenError extends AppError{
    constructor(message="Forbidden Request"){
        super(message,403)
    }
}

export class DuplicateError extends AppError{
    constructor(message="Duplicate Error"){
        super(message,409)
    }
}

export class ZodError extends AppError{
   public details:string[];

   constructor(error:ZodValidationError){
    super("Validation Error",400)
    this.details=error.errors.map(err=>`
         ${err.path.join(".")}: ${err.message}
        `);
   }
}

export default AppError;

