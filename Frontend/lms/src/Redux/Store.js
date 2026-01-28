import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Redux/userSlice.js"
import courseSlice from "../Redux/courseSlice.js"
import lectureSlice from "../Redux/lectureSlice.js"
export const Store=configureStore({
reducer:{
    user:userSlice,
    course:courseSlice,
    lecture:lectureSlice
}
})