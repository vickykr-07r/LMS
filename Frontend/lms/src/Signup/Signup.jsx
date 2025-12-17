import { useState } from "react";
import Style from "../Signup/Signup.module.css"
import { FcGoogle } from "react-icons/fc";
export function Signup(){
    let [signupdata,setSignupData]=useState({
        name:"",
        email:"",
        password:""
    });

    function handleinput(event){
      setSignupData((pre)=>{
      return {...pre,[event.target.name]:event.target.value}
      })
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
        <form action="">

         <label htmlFor="name">Name</label>
         <input type="text" placeholder="Your Name" id="name" value={signupdata.name} onChange={handleinput}/>

         <label htmlFor="email">Email</label>
         <input type="email" placeholder="Enter Email" id="email" value={signupdata.email} onChange={handleinput}/>

         <label htmlFor="password">Password</label>
         <input type="password" placeholder="**********" id="password" value={signupdata.password} onChange={handleinput}/>

         <div className={Style.role}>
         <span>Student</span>
         <span>Educator</span>
         </div>

         <button>Signup</button>

         </form>
         </div>

         <div className={Style.space}>
          <p>Or Continue With</p>
         </div>

         <div className={Style.logingoogle}>
         <button><FcGoogle /> Google</button>
         </div> 
         
         <div className={Style.footer}>
         <span>Already have an Account ? </span>
         <span>Login</span>
         </div>

         </div>
        </div>
        </>
    )
}