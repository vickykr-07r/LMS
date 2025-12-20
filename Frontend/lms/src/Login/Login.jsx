import { useState,useContext } from "react";
import Style from "../Login/Login.module.css"
import axios from "axios"
import { ServerContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice";
export function Login(){
    let [logindata,setLoginData]=useState({
        email:"",
        password:""
    });
    let [loading ,setLoading]=useState(false);
    let navigate=useNavigate();
    let{serverurl}=useContext(ServerContext)
    function handleinput(event){
      setLoginData((pre)=>{
      return {...pre,[event.target.name]:event.target.value}
      })
    }
    let dispatch=useDispatch();
    async function handleSubmit(event){
        event.preventDefault();
        setLoading(true)
     try {
        let result=await axios.post(`${serverurl}/api/auth/login`,logindata,{withCredentials:true})
        alert(result.data.message)
        dispatch(setUserData(result.data))
        navigate("/")
        setLoading(false)
     } catch (error) {
        alert(error.response.data.message); 
        console.log(error)
        setLoading(false)
     }
    }
    return(
        <>
        <div className={Style.container}>

         <div className={Style.box}>

         <div className={Style.signupnav}>
            <h2>Login Your Account</h2>
         </div>

        <div className={Style.form}>  
        <form onSubmit={handleSubmit}>

         <label htmlFor="email">Email</label>
         <input type="email" placeholder="Enter Email" id="email" value={logindata.email} onChange={handleinput} name="email"/>

         <label htmlFor="password">Password</label>
         <input type="password" placeholder="**********" id="password" value={logindata.password} onChange={handleinput} name="password"/>

         <button>{loading ? <ClipLoader/> :"Login"}</button>

         </form>
         </div>
          
         <div className={Style.footer}>
         <span>Don't have Account ?</span>
         <span onClick={()=>{navigate("/signup")}}>Register Now</span>
         </div>

         </div>
        </div>
        </>
    )
}