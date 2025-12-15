import express from "express"
export const authRouter=express.Router();

import { login } from "../Controllers/isAuth.controllers.js";
import { signup } from "../Controllers/isAuth.controllers.js";
import { logout } from "../Controllers/isAuth.controllers.js";
authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/logout",logout)