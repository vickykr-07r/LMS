import { createSlice } from "@reduxjs/toolkit";

let courseSlice=createSlice({
    name:"courses",
    initialState:{
    creatorCoursesData:[],
    courseData:null,
    selectedCourse:null,
    },
    
    reducers:{
        setCreatorCoursesData:(state,actions)=>{
        state.creatorCoursesData=actions.payload
        },
        setCourseData:(state,actions)=>{
         state.courseData=actions.payload
        },
        setSelectedCourse:(state,actions)=>{
         state.selectedCourse=actions.payload
        }
    }
})

export const {setCreatorCoursesData}=courseSlice.actions;
export const {setSelectedCourse}=courseSlice.actions;
export const {setCourseData}=courseSlice.actions;
export default courseSlice.reducer