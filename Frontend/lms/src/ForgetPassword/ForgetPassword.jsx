import { useContext, useState } from "react"
import Style from "../ForgetPassword/ForgetPassword.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { ServerContext } from "../Context/Context.jsx";
function ForgetPassword(){
    let [step,setStep]=useState("1")
    let [email,setEmail]=useState("");
    let [otp,setOtp]=useState("");
    let [password,setPassword]=useState("");
    let [newPassword,setNewPassword]=useState("");
    let navigate=useNavigate()
    let {serverurl}=useContext(ServerContext)
    async function sendotp(event){
        event.preventDefault();
        try {
            console.log("heelo")
            let result=await axios.post(`${serverurl}/api/auth/sendotp`,{email},{withCredentials:true})
            console.log("first")
            console.log(result.data)
            setStep("2");
        } catch (error) {
            console.log(error)
        }
    }
    async function verifyotp(event){
        event.preventDefault();
        try {
           let result=await axios.post(`${serverurl}/api/auth/verifyotp`,{email,otp},{withCredentials:true})
           console.log(result.data)
           setStep("3")
        } catch (error) {
            console.log(error)
        }
    }
    async function Password(event){
        event.preventDefault();
      try {
        let result=await axios.post(`${serverurl}/api/auth/resetpassword`,{email,password},{withCredentials:true})
        console.log(result.data)
        navigate("/")
      } catch (error) {
        console.log(error)
      }
    }
    return(
        <>
        <div className={Style.container}>
          <div className={Style.box}>

           {step=="1" &&
            <div className={Style.sendotp}>
             <h1>Forget Your Password</h1>
             <div className={Style.sendotpform}>
             <form onSubmit={sendotp}>
                <label htmlFor="">Enter Your Email Address</label>
                <input type="email" placeholder="eg-vicky@gmail.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <button>Send Otp</button>
             </form>
             </div>
             <span onClick={()=>{navigate("/login")}}>Back To Login</span>
           </div>
           }
           
           {step=="2" &&
            <div className={Style.verify}>
            <h1>Enter OTP</h1>
            <div className={Style.verifyform}>
            <form onSubmit={verifyotp}>
             <label htmlFor="">Please enter the 4-digit code sent to your email</label>
             <input type="text" placeholder="enter here" value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
             <button>Verify Otp</button>
             </form>
            </div>
            <span onClick={()=>{navigate("/login")}}>Back to login</span>
           </div>
           }

           {
            step=="3" && 
            <div  className={Style.password}>
            <h1>Enter New Password</h1>
            <div className={Style.passwordform}>
                <form onSubmit={Password}>
           <label htmlFor="">New Password</label>
           <input type="text" placeholder="New Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
           <label htmlFor="">Confirm Password</label>
           <input type="text" placeholder="Re-enter new password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
           <button>Reset Password</button>
           </form>
            </div>
            <span onClick={()=>{navigate("/login")}}>Back to login</span>
            </div>
           }

          </div>
        </div>
        </>
    )
}
export default ForgetPassword;