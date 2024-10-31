import {PrismaClient} from "@prisma/client"
import dotenv from "dotenv"
import express, {Express,Request,Response} from "express"
import { userRouter } from "./routes/UserTodo";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app:Express=express();
const port =process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/user",userRouter);



app.use(errorHandler);

app.listen((port),()=>{
    console.log(`[Server] : Server running at http://localhost:${port}`)
})