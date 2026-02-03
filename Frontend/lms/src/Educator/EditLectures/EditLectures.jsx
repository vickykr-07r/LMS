import { useState } from "react";
import Style from "../EditLectures/EditLectures.module.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { useContext } from "react";
import { ServerContext } from "../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
function EditLecture(){
    let[title,setTitle]=useState("");
    let[file,setFile]=useState(null);
    let[preview,setPreview]=useState(false);
    let {lectureId,courseId}=useParams();
    let {serverurl}=useContext(ServerContext)
    let navigate=useNavigate();
   function handleFile(event) {
    const video = event.target.files?.[0];
     if (!video) return;

    setFile(video);
    }
    
    async function handlesubmit(event){
       event.preventDefault()
       let form =new FormData();
       form.append("lecturetitle",title);
       form.append("videoUrl",file)
       form.append("ispreviewfree",preview)
       try {
        let result = await axios.post(`${serverurl}/api/course/editlecture/${lectureId}`,form,{withCredentials:true})
        console.log(result.data);
       } catch (error) {
        console.log(error)
       }
    }

    async function removelecture(){
      try {
        let result =await axios.delete(`${serverurl}/api/course/removelecture/${lectureId}`,{withCredentials:true});
        console.log(result.data);
        navigate(`/createlecture/${courseId}`)
      } catch (error) {
        console.log(error)
      }
    }
    return(
        <>
        <div className={Style.container}>
  <div className={Style.box}>

    <div className={Style.head}>
      <IoMdArrowRoundBack />
      <h1>Update Your Lecture</h1>
    </div>

    <button className={Style.removeBtn} onClick={removelecture}>Remove Lecture</button>

    <div className={Style.form}>
      <label>Title</label>
      <input type="text" placeholder="Introduction to Backend" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>

      <label>Video *</label>
      <input type="file"  accept="video/*" onChange={handleFile}/>

      <div className={Style.checkbox}>
        <input type="checkbox" checked={preview} onChange={(event)=>{setPreview(event.target.checked)}}/>
        <span>Is this video FREE</span>
      </div>

      <button className={Style.updateBtn} onClick={handlesubmit}>Update Lecture</button>
    </div>

  </div>
</div>

        </>
    )
}

export default EditLecture;