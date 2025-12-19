import express from "express"
export const userRouter=express.Router();
import { isAuth } from "../Middlewares/isAuth.middlewares.js";
import { currentuser } from "../Controllers/user.controllers.js";
userRouter.get("/getcurrent",isAuth,currentuser)