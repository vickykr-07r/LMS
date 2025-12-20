import User from "../Models/user.models.js";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"

export const signup=async(req,res)=>{
try {
    const {name,email,password,role}=req.body;

       if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    const existuser=await User.findOne({email})
    if(existuser){
        return res.status(400).json({
            message:"user already exist"
        })
    }
    const hassedpassword = await bcrypt.hash(password,10);
    const user = await User.create({
    name,
    email,
    password:hassedpassword,
    role
    })

    const token=jwt.sign(
    {id:user._id},
    process.env.SECRET_KEY,
    {expiresIn:"7d"}
    ) 

    res.cookie("token", token, {
    httpOnly: true,  
    secure: process.env.NODE_ENV === "production",    
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
    })  

    user.password = undefined;

    return res.status(201).json({
    message:"user registered successfully",
    user
    })

} catch (error) {
    return res.status(500).json({
        message:error.message
    })
}
}

export const login=async(req,res)=>{
try {
    const {email,password}=req.body;

       if ( !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    const existuser=await User.findOne({email})
    if(!existuser){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const comparepassword = await bcrypt.compare(password,existuser.password);
    
    if(!comparepassword){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token=jwt.sign(
    {id:existuser._id},
    process.env.SECRET_KEY,
    {expiresIn:"7d"}
    ) 

    res.cookie("token", token, {
    httpOnly: true,  
    secure: process.env.NODE_ENV === "production",    
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
    })
     
    existuser.password = undefined;

    return res.status(200).json({
    message:"login successfully",
    user:existuser
    })

} catch (error) {
    return res.status(500).json({
        message:error.message
    })
}
}

export const logout =async(req,res)=>{
try {
    res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" 
});
return res.status(200).json({
    message:"logout successfully"
})
} catch (error) {
    return res.status(500).json({
        message:error.message
    })
}
}