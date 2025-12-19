import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Redux/userSlice.js"
export const Store=configureStore({
reducer:{
    user:userSlice
}
})