import { useState } from "react";
import Style from "../Signup/Signup.module.css"
import { FcGoogle } from "react-icons/fc";
import axios from "axios"
import { useContext } from "react";
import { ServerContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice.js";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Utils/Firebase.js";
export function Signup(){
    let [signupdata,setSignupData]=useState({
        name:"",
        email:"",
        password:""
    });
    let [role,setRole]=useState("");
    let [loading ,setLoading]=useState(false);
    const navigate=useNavigate();
    let dispatch=useDispatch()
    let{serverurl}=useContext(ServerContext)
    function handleinput(event){
      setSignupData((pre)=>{
      return {...pre,[event.target.name]:event.target.value}
      })
    }
    async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    
    try {
    const result = await axios.post(`${serverurl}/api/auth/signup`,{ ...signupdata, role },{ withCredentials: true });
    alert(result.data.message); 
    dispatch(setUserData(result.data));
    setLoading(false);
    navigate("/");

    } catch (error) {
    alert(error.response.data.message); 
    console.log(error);
    setLoading(false);
    }
   }

   const googleauth=async ()=>{
   try {
    const response=await signInWithPopup(auth , provider)
    console.log(response);
    let email = response.user.email
    let name  = response.user.displayName
    const result = await axios.post(`${serverurl}/api/auth/googleauth`,{name,email,role},{withCredentials:true})
    dispatch(setUserData(result.data))
    alert(result.data.message); 
    navigate("/")
   } catch (error) {
    console.log(error)
   }
   }
    return( 
        <>
        <div className={Style.container}>

        <div className={Style.box}>

         <div className={Style.signupnav}>
            <h1>Let's Get Started</h1>
            <h2>Create Your Account</h2>
         </div>

        <div className={Style.form}>  
        <form onSubmit={handleSubmit}>

         <label htmlFor="name">Name</label>
         <input type="text" placeholder="Your Name" id="name" value={signupdata.name} onChange={handleinput} name="name"/>

         <label htmlFor="email">Email</label>
         <input type="email" placeholder="Enter Email" id="email" value={signupdata.email} onChange={handleinput} name="email"/>

         <label htmlFor="password">Password</label>
         <input type="password" placeholder="**********" id="password" value={signupdata.password} onChange={handleinput} name="password"/>

         <div className={Style.role}>
         <span  onClick={()=>{setRole("student")}}>Student</span>
         <span  onClick={()=>{setRole("educator")}}>Educator</span>
         </div>

         <button type="submit">{loading ? <ClipLoader/>:"Signup"}</button>

         </form>
         </div>

         <div className={Style.space}>
          <p>Or Continue With</p>
         </div>

         <div className={Style.logingoogle}>
         <button onClick={googleauth}><FcGoogle /> Google</button>
         </div>
         
         <div className={Style.footer}>
         <span>Already have an Account ? </span>
         <span onClick={()=>{navigate("/login")}}>Login</span>
         </div>

        </div>

        </div>
        </>
    )
}