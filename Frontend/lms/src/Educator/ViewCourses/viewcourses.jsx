import { useDispatch, useSelector } from "react-redux";
import Style from "../ViewCourses/viewcourses.module.css"
import { setSelectedCourse } from "../../Redux/courseSlice";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../assets/360_F_1782566901_cVPHOOg5fMRbCKNX61r4MG5okjv7KS2a.jpg"
function ViewCourses(){
   let {courseId}=useParams();
    let {creatorCoursesData}=useSelector(state=>state.course)
    let {selectedCourse}=useSelector(state=>state.course)
    let dispatch=useDispatch();
    let navigate=useNavigate();
    console.log(selectedCourse)
    const fetchCourseData=async()=>{
     creatorCoursesData.map((course)=>{
             if(course._id==courseId){
                dispatch(setSelectedCourse(course))
                console.log(selectedCourse)
             }
     })
    }

    useEffect(()=>{
        fetchCourseData()
    },[creatorCoursesData,courseId])
    return(
        <>
        <div className={Style.container}>
            <div className={Style.topsection}>
              <div className={Style.back} onClick={()=>{navigate("/")}}>
               <IoMdArrowBack />
              </div>
              <div className={Style.left}>
             {selectedCourse?.thumbnail ? <img src={selectedCourse.thumbnail} alt="" /> :<img src={image}/>}
              </div>
              <div className={Style.right}>
                <div className={Style.rightdata}>
                 <h1>{selectedCourse?.title}</h1>
                <h2>{selectedCourse?.subtitle}</h2>
                <h3>price:{selectedCourse?.price}</h3>
                <p>10+ hours of video content</p>
                <p>Lifetime access to course materials</p>

                <button>Enroll Now</button>
                </div>
               

              </div>
            </div>

            <div className={Style.coursedetail}>
                <div className={Style.coursedetailfirst}>
                 <h1>What you'll learn </h1>
            <ul>
                <li>
                    Learn {selectedCourse?.category} from Beginning
                </li>
            </ul>
                </div>
            
             <div className={Style.coursedetailsec}>
             <h1>Who This Course Is For</h1>
            <p>Beginner ,aspiring developers and professionals looking to upgrade skills</p>
             </div>
            
            <div className={Style.coursedetailsec}>
                <h1> Course Curriculum</h1>
            <p>{selectedCourse?.lectures?.length} lectures</p>
            
            </div>
           
            </div>
        </div>
        </>
    )
}

export default ViewCourses