import { useDispatch, useSelector } from "react-redux";
import Style from "../ViewCourses/viewcourses.module.css"
import { setSelectedCourse } from "../../Redux/courseSlice";
import { useEffect } from "react";
function ViewCourses(){
    let {courseId}=useParams();
    let {creatorCoursesData}=useSelector(state=>state.course)
    let {selectedCourse}=useSelector(state=>state.course)
    let dispatch=useDispatch();

    const fetchCourseData=async()=>{
     creatorCoursesData.map((course)=>{
             if(course._id==courseId){
                dispatch(setSelectedCourse(course))
                console.log(selectedCourse)
             }
     })
    }

    useEffect(()=>{
        fetchCourseData
    },[creatorCoursesData,courseId])
    return(
        <>
        <div className={Style.container}>

        </div>
        </>
    )
}

export default ViewCourses