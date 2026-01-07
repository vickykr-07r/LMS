import { createSlice } from "@reduxjs/toolkit";

let courseSlice=createSlice({
    name:"courses",
    initialState:{
    creatorCoursesData:[]
    },
    reducers:{
        setCreatorCoursesData:(state,actions)=>{
        state.creatorCoursesData=actions.payload
        }
    }
})

export const {setCreatorCoursesData}=courseSlice.actions;
export default courseSlice.reducer