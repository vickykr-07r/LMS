import { useNavigate, useParams } from "react-router-dom";
import Style from "../CreateLecture/CreateLecture.module.css"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ServerContext } from "../../Context/Context";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../Redux/lectureSlice";
import { BiSolidEdit } from "react-icons/bi";
function Createlecture(){
    let [lecturetitle,setLectureTitle]=useState("");
    let [loading,setLoading]=useState(false);

    let dispatch=useDispatch();
    let {lectureData}=useSelector(state=>state.lecture)

    let {courseId}=useParams();
    let navigate=useNavigate();
    
    let {serverurl}=useContext(ServerContext)

    async function handlecreateLecture(){
        setLoading(true);
     try {
        let result =await axios.post(`${serverurl}/api/course/createlecture/${courseId}`,{lecturetitle},{withCredentials:true})
        console.log(result.data)
        dispatch(setLectureData([...lectureData,result.data.lecture]))
        setLoading(false);
     } catch (error) {
        console.log(error)
        setLoading(false);
     }
    }

    useEffect(()=>{
        async function getcourselecture(){
            try {
               let result = await axios.get(`${serverurl}/api/course/courselecture/${courseId}`,{withCredentials:true})
            dispatch(setLectureData(result.data)); 
            console.log(result.data)
            } catch (error) {
                console.log(error)
            }
            
        }
        getcourselecture();
    },[])
    return(
        <>
        <div className={Style.container}>
        <div className={Style.box}>
        <div className={Style.heading}>
        <h1>Lets's Add a Lecture</h1>
        <p>Enter The Title And Add Your Video Lectures To Enchances Your Course Content</p>
        </div>
        
        <input type="text" placeholder="e.g. Introduction to mern stack" value={lecturetitle} onChange={(event)=>{setLectureTitle(event.target.value)}}/>
        <div className={Style.button}>
         <button onClick={()=>{navigate(`/editcourse/${courseId}`)}}>Back To Course</button>
         <button onClick={handlecreateLecture}>{loading ? <ClipLoader size={30} color="white"/> : "create Lecture"}</button>
        </div>
        
        {lectureData?.lectures?.map((lecture, index) => (
        <div key={lecture._id} className={Style.lecturerow}>
        <span>
        Lecture-{index + 1}: {lecture.lecturetitle}
        </span>

        <span><BiSolidEdit /></span>
        </div>
        ))}


        </div>
        </div>
        </>
    )
}

export default Createlecture;