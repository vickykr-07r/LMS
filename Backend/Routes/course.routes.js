import express from "express";
export let courseRouter=express.Router();
import upload from "../Middlewares/multer.js";
import { createCourse, createlecture, editlecture, getcourselecture, removelecture } from "../Controllers/courses.js";
import { getpublishedcourse } from "../Controllers/courses.js";
import { getcreatorcourses } from "../Controllers/courses.js";
import { editcourse } from "../Controllers/courses.js";
import { getcoursebyid } from "../Controllers/courses.js";
import { removecourse } from "../Controllers/courses.js";
import { isAuth } from "../Middlewares/isAuth.middlewares.js";
courseRouter.post("/create",isAuth,createCourse)
courseRouter.get("/getpublished",getpublishedcourse)
courseRouter.get("/getcreator",isAuth,getcreatorcourses)
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editcourse)
courseRouter.get("/getcoursebyid/:courseId",isAuth,getcoursebyid)
courseRouter.delete("/remove/:courseId",isAuth,removecourse) 

courseRouter.post("/createlecture/:courseId",isAuth,createlecture)
courseRouter.get("/courselecture/:courseId",isAuth,getcourselecture)
courseRouter.post("/editlecture/:lectureId",isAuth,upload.single("videoUrl"),editlecture)
courseRouter.delete("/removelecture/:lectureId",isAuth,removelecture)