import { createSlice } from "@reduxjs/toolkit";

let courseSlice=createSlice({
    name:"courses",
    initialState:{
    creatorCoursesData:[],
    selectedCourse:null,
    },
    
    reducers:{
        setCreatorCoursesData:(state,actions)=>{
        state.creatorCoursesData=actions.payload
        },
        setSelectedCourse:(state,actions)=>{
         state.selectedCourse=actions.payload
        }
    }
})

export const {setCreatorCoursesData}=courseSlice.actions;
export const {setSelectedCourse}=courseSlice.actions;
export default courseSlice.reducer