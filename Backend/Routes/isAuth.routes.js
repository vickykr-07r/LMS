import express from "express"
export const authRouter=express.Router();

import { login } from "../Controllers/isAuth.controllers.js";
import { signup } from "../Controllers/isAuth.controllers.js";
import { logout } from "../Controllers/isAuth.controllers.js";
import { sendotp } from "../Controllers/isAuth.controllers.js";
import { verifyotp } from "../Controllers/isAuth.controllers.js";
import { resetpassword } from "../Controllers/isAuth.controllers.js";
import { googleauth } from "../Controllers/isAuth.controllers.js";
authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.post("/sendotp",sendotp)
authRouter.post("/verifyotp",verifyotp)
authRouter.post("/resetpassword",resetpassword)
authRouter.post("/googleauth",googleauth)
 