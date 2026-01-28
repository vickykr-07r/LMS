import { createSlice } from "@reduxjs/toolkit";

let lectureSlice=createSlice({
    name:"lecture",
    initialState:{
        lectureData:[]
    },
    reducers:{
        setLectureData:(state,actions)=>{
        state.lectureData=actions.payload;
        }
    }
})

export const {setLectureData}=lectureSlice.actions
export default lectureSlice.reducer