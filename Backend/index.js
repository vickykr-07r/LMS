import express from "express"
const app =express();

import dotenv from "dotenv"
dotenv.config();

import cookieParser from "cookie-parser";
app.use(cookieParser())

app.use(express.urlencoded({extended:true}))
app.use(express.json());

import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


import connect from "./DB/db.connect.js";

import { authRouter } from "./Routes/isAuth.routes.js";

app.use("/auth/user",authRouter)
app.listen(process.env.PORT,()=>{
    console.log("the app is listening")
    connect();
}) 