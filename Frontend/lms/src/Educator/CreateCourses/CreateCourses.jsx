import { IoMdArrowRoundBack } from "react-icons/io";
import Style from "../CreateCourses/CreateCourses.module.css"
import axios from "axios";
import { useContext, useState } from "react";
import { ServerContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
function CreateCourses(){
    let{serverurl}=useContext(ServerContext)
    let[title,setTitle]=useState("");
    let[category,setCategory]=useState("");
    let navigate=useNavigate();
    async function handlesubmit(e){
        e.preventDefault();
        try {
           let result= await axios.post(`${serverurl}/api/course/create`,{title,category},{withCredentials:true})
           console.log(result.data);
        } catch (error) {
            console.log(error)
        }
    }
    return(
    <>
    <div className={Style.container}>
     <div className={Style.box}>
      <div className={Style.nav}>
       <IoMdArrowRoundBack onClick={()=>{navigate("/courses")}}/>
       <h1>Create Courses</h1>
      </div>
      <div className={Style.form}>
       <form onSubmit={handlesubmit}>
        <label htmlFor="">Course Title</label>
        <input type="text" placeholder="Enter Course Title " value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="WebDevelopment">Web Development</option>
        <option value="UI/UX">UI/UX</option>
        <option value="AppDevelopment">App Development</option>
        <option value="AI/ML">AI/ML</option>
        <option value="DataScience">Data Science</option>
        <option value="DataAnalytics">Data Analytics</option>
        <option value="AiTools">Ai Tools</option>
        <option value="Other">Other</option>
</select>

        <button onClick={()=>{navigate("/courses")}}>Create Courses</button>
       </form>
      </div>
     </div>
    </div>
    </>
    
)
} 

export default CreateCourses;