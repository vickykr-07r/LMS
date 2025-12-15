import express from "express"
const app =express();

import dotenv from "dotenv"
dotenv.config();

import connect from "./DB/db.connect.js";

import { authRouter } from "./Routes/isAuth.routes.js";
app.use("/auth/user",authRouter)
app.listen(process.env.PORT,()=>{
    console.log("the app is listening")
    connect();
}) 