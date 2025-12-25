import express from "express"
export const userRouter=express.Router();
import { isAuth } from "../Middlewares/isAuth.middlewares.js";
import { currentuser } from "../Controllers/user.controllers.js";
import { editprofile } from "../Controllers/user.controllers.js";
import upload from "../Middlewares/multer.js";
userRouter.get("/getcurrent",isAuth,currentuser)
userRouter.get("/editprofile",isAuth,upload.single("photourl"),editprofile)