import axios from "axios";
import { useContext, useEffect } from "react";
import { ServerContext } from "../Context/Context";
import { useDispatch } from "react-redux";
import { setCreatorCoursesData } from "../Redux/courseSlice";

function getCreatorCourses(){
    let {serverurl}=useContext(ServerContext);
    let dispatch=useDispatch()
    useEffect(()=>{
       async function getpublishedcourse(){
           try {
            let result=await axios.get(`${serverurl}/api/course/getcreator`,{withCredentials:true})
            dispatch(setCreatorCoursesData(result.data))
           } catch (error) {
            console.log(error)
           }
        }
        getpublishedcourse();
    })
    return(
        <>
        </>
    )
}

export default getCreatorCourses;