import { useDispatch, useSelector } from "react-redux";
import Style from "../Nav/Nav.module.css"
import axios from "axios";
import { useContext, useState } from "react";
import { ServerContext } from "../Context/Context.jsx";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../Redux/userSlice";
import { IoReorderThree } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import dp from "../assets/1bc39f6f1d788ad7bb599655da3d242e.jpg"
function Nav(){
    let{userData}=useSelector(state=>state.user)
   let {serverurl}=useContext(ServerContext);
   let navigate=useNavigate()
   let dispatch=useDispatch();
   let [profileslidedown,setProfileslidedown]=useState(false)
   let [show ,setShow]=useState(false)
    async function logout(){
        try {
           let result=await axios.get(`${serverurl}/api/auth/logout`,{withCredentials: true}) 
           console.log(result.data.message)
           dispatch(setUserData(null))
           navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        <div className={Style.navcontainer}>
         <div className={Style.navbox}>
           <div className={Style.left}>
            <img src="https://thumbs.dreamstime.com/b/lms-learning-management-system-acronym-software-application-administration-documentation-tracking-reporting-automation-264284719.jpg?w=992" alt="" />
           </div>
            <div className={Style.right}>
             <img src={userData?.photourl === "" ? dp : userData?.photourl} alt="" onClick={() => setProfileslidedown(pre => !pre)}
/>
             {
                userData?.role==="educator" &&
                <button>Dashboard</button>
             }
             {
                userData && 
               <button onClick={logout}>Logout</button>
             }
             {
                !userData && 
                <button onClick={()=>{navigate("/login")}}>Login</button>
             }
             <div className={Style.IoReorderThree} onClick={()=>{setShow(true)}}>
               <IoReorderThree />
             </div>
            </div>
            {
                profileslidedown &&
                <div className={Style.profileslidedown}>
               <h1 onClick={()=>{navigate("/profile")}}>My Profile</h1>
               <h1>My Course</h1>
             </div>
             }

           {
              show && (
                <div className={Style.mobilemenu}>
                <MdCancel className={Style.closeicon} onClick={() => setShow(false)} />
                <button>My Profile</button>
                <button>My Course</button>
                {userData?.role === "educator" && <button>Dashboard</button>}
                <button onClick={logout}>Logout</button>
                </div>
                )
            }



         </div>
        </div>
        </>
    )
}

export default Nav;