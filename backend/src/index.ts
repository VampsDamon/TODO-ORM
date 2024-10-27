import {PrismaClient} from "@prisma/client"
import dotenv from "dotenv"
import express, {Express,Request,Response} from "express"
import { userRoutes } from "./routes/User";

const app:Express=express();
const port =process.env.PORT||3000

app.use("/user",userRoutes);

app.listen((port),()=>{
    console.log(`[Server] : Server running at http://localhost:${port}`)
})