import { useNavigate } from "react-router-dom"
import Style from "../Edit Profile/Editprofile.module.css"
import { useDispatch, useSelector } from "react-redux"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import dp from "../assets/1bc39f6f1d788ad7bb599655da3d242e.jpg"
import axios from "axios"
import { useContext, useRef, useState } from "react";
import { ServerContext } from "../Context/Context";
import { setUserData } from "../Redux/userSlice";
function Editprofile(){
    let {userData} =useSelector(state=>state.user)
    let navigate=useNavigate();
    let[name,setName]=useState(userData.name || "");
    let [description,setDescription]=useState(userData.description || "")
    let [frontimage,setFrontImage]=useState(null);
    let [backimage,setbackImage]=useState(null)
    
    let {serverurl}=useContext(ServerContext)
    function handleimage(e) {
    let image = e.target.files[0];
     if (!image) return;

     setFrontImage(image);
     setbackImage(URL.createObjectURL(image));
    }
    
    let ref=useRef();
    let dispatch = useDispatch();
    const submit=async()=>{
        const formData=new FormData();
        formData.append("name",name);
        formData.append("photourl",frontimage)
        formData.append("description",description)
        try {
        const result = await axios.post(`${serverurl}/api/user/editprofile`,formData,{ withCredentials: true });
        dispatch(setUserData(result.data))
        navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <>
       <div className={Style.container}>
        <div className={Style.box}>
         <div className={Style.back} onClick={()=>{navigate("/profile")}}>
         <IoArrowBackCircleSharp />
         <h3>Edit Profile</h3>
         </div>
         
         <div className={Style.profile} onClick={()=>{ref.current.click()}}>
       <img src={backimage || userData?.photourl || dp} alt="profile"/>
         <IoMdAdd />
         </div>
         
         <div className={Style.form}>
          <form action="">
           <input type="file" placeholder="No file chosen" hidden  accept="image/*" ref={ref} onChange={handleimage}/>
        
          <label htmlFor=""> Full Name</label>
           <input type="text" placeholder="enter full name" value={name} onChange={(e)=>{setName(e.target.value)}}/>

           <label htmlFor="">Email</label>
           <input type="text" placeholder={userData?.email} readOnly/>

           <label htmlFor="">Description</label>
           <textarea name="" id="" placeholder="Tell us about yourself" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
          </form>
         </div>
          
          <div className={Style.button}>
           <button onClick={submit}>Save Changes</button>
          </div>
        </div>
       </div>
        </>
    )
}

export default Editprofile