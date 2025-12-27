import { useNavigate } from "react-router-dom"
import Style from "../Edit Profile/Editprofile.module.css"
import { useSelector } from "react-redux"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import dp from "../assets/1bc39f6f1d788ad7bb599655da3d242e.jpg"
function Editprofile(){
    let {userData} =useSelector(state=>state.user)
    let navigate=useNavigate();
    return(
        <>
       <div className={Style.container}>
        <div className={Style.box}>
         <div className={Style.back} onClick={()=>{navigate("/profile")}}>
         <IoArrowBackCircleSharp />
         <h3>Edit Profile</h3>
         </div>
         
         <div className={Style.profile}>
         <img src={userData.photourl =="" ? dp :null} alt="" />
         </div>
         
         <div className={Style.form}>
          <form action="">
           <label htmlFor=""> Select Avatar</label>
           <input type="file" placeholder="No file chosen"/>
        
        <label htmlFor=""> Full Name</label>
           <input type="text" placeholder="enter full name"/>

           <label htmlFor="">Email</label>
           <input type="text" placeholder={userData?.email} readOnly/>

           <label htmlFor="">Description</label>
           <textarea name="" id="" placeholder="Tell us about yourself"></textarea>
          </form>
         </div>
          
          <div className={Style.button}>
           <button onClick={()=>{navigate("/")}}>Save Changes</button>
          </div>
        </div>
       </div>
        </>
    )
}

export default Editprofile