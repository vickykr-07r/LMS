import { IoMdArrowRoundBack } from "react-icons/io";
import Style from "../EditCourse/EditCourse.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ServerContext } from "../../Context/Context";
function EditCourse(){
   const  ref=useRef();
    let navigate=useNavigate();
    let {courseId}=useParams();
    let {serverurl}=useContext(ServerContext)
    let [courseData,setCourseData]=useState(null);
    let [title,setTitle]=useState("")
    let [frontend ,setFrontend]=useState(null);
    let [Backend,setBackend]=useState(null);
    let [subtitle,setSubtitle]=useState("");
    let [description,setDescription]=useState("");
    let [category,setCategory]=useState("");
    let [courselevel,setcourselevel]=useState("");
    let [price,setPrice]=useState("");
    function handleimage(e){
     let image=e.target.files[0];
      if (!image) return;

  setFrontend(image); 
  setBackend(urlencoded.fronted);
    }

    useEffect(()=>{
       async function getcoursebyid(){
            try {
                let result=await axios.get(`${serverurl}/api/course/getcoursebyid/${courseId}`,{withCredentials:true})
                setCourseData(result.data)
                console.log(result.data)
            } catch (error) {
                console.log(error);
            }
        }
        getcoursebyid();
    },[])

    useEffect(()=>{
        if(courseData){
            setTitle(courseData.title)
        }
    })

    async function handlesubmit(e){
        e.preventDefault();
        let formData=new FormData;
        formData.append("title",title)
        formData.append("subtitle",subtitle)
        formData.append("description",description )
        formData.append("category", category)
        formData.append("level", courselevel)
        formData.append("price", price)
        try {
            let result=await axios.post(`${serverurl}/api/course/editcourse/${courseId}`,{form},{withCredentials:true})
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        <div className={Style.container}>
         <div className={Style.box}>

            <div className={Style.nav}>
             <div className={Style.navleft}>
              <IoMdArrowRoundBack />
              <h1>Edit Courses</h1>
             </div>
             <div className={Style.navright}>
              <button>Go To Lecture Page</button>
             </div>
            </div>
            
            <div className={Style.courseinfo}>
               <h1>Basic Course Information</h1>
               <div className={Style.button2}>
               <button>Click To publish</button>
               <button>Remove Courses</button>
               </div>
               <div className={Style.form}>

               <label htmlFor="">Title</label>
               <input type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>

               <label htmlFor="">Subtitle</label>
               <input type="text" value={subtitle} onChange={(e)=>{setSubtitle(e.target.value)}}/>

               <label htmlFor="">Description</label>
               <textarea name="" id="" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>

               <label htmlFor="">Category</label>
               <select name="" id="" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                <option value="">Select Category</option>
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

               <label htmlFor="">Course Level</label>
               <select name="" id="" value={courselevel} onChange={(e)=>{setcourselevel(e.target.value)}}>
                <option value="">Select Level</option>
                 <option value="WebDevelopment">Begginer</option>
                 <option value="UI/UX">Intermediate</option>
                 <option value="AppDevelopment">Advanced</option>
               </select>

               <label htmlFor="">Price INR</label>
               <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>

               <label htmlFor="">Course Thumbnail</label>
               <input type="file" hidden accept="image/*" ref={ref} onChange={handleimage}/>
                <img src={ frontend ? URL.createObjectURL(frontend): "https://via.placeholder.com/300x180?text=Upload+Image"}alt=""onClick={() => ref.current.click()}/>
               <button onClick={()=>{navigate("/courses")}}>Cancel</button>
               <button onClick={handlesubmit}>Save</button>
               </div>
            </div>

         </div>
        </div>
        </>
    )
}

export default EditCourse