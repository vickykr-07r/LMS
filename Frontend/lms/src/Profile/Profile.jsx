import { useSelector } from "react-redux";
import Style from "../Profile/Profile.module.css"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import dp from "../assets/1bc39f6f1d788ad7bb599655da3d242e.jpg"
import { useNavigate } from "react-router-dom";
function Profile(){
    let {userData} =useSelector(state=>state.user)
    let navigate=useNavigate();
    function handlenavigate(){
      navigate("/editprofile")
    }
    function handleback(){
       navigate("/") 
    }
    return(
        <>
        <div className={Style.container}>
         <div className={Style.box}>
          <div className={Style.back} onClick={handleback}>
            <IoArrowBackCircleSharp />
          </div>
          <div className={Style.profile}>
            <img src={userData.photourl|| dp} alt="" />
            <h2>{userData?.name}</h2>
            <h3>{userData?.role}</h3>
          </div>
          <div className={Style.profiledetail}>
           <p>Email:{userData?.email}</p>
           <p>Bio:{userData?.Bio}</p>
           <p>Enrolled Course:{userData?.enrolledcourses.length}</p>
          </div>
          <div className={Style.button}>
           <button onClick={handlenavigate}> Edit Profile</button>
          </div>
         </div>
        </div>
        </>
    )
}

export default Profile;