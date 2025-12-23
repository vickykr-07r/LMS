import User from "../Models/user.models.js";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"
import SendMail from "../Config/SendMail.js";

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

export const sendotp =async(req,res)=>{
try {
    let {email}=req.body;
    let user=await User.findOne({email}).select("-password")
    if(!user){
    return res.status(400).json({
        message:"user not found"
    })
    }
     
    let otp=Math.floor(1000 + Math.random() * 9000);
    user.resetotp=otp;
    user.otpexpires=Date.now() + 5 * 60 * 1000;
    user.isotpverified=false;
    await user.save();
    await SendMail(email,otp);

    return res.status(200).json({
        message:"otp sent successfully"
    })

} catch (error) {
    return res.status(500).json({
        message:error.message
    })
}
}; 

export const verifyotp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.resetotp) {
      return res.status(400).json({ message: "OTP not generated" });
    }

    if (user.isotpverified) {
      return res.status(400).json({ message: "OTP already verified" });
    }

    if (user.otpexpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.resetotp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isotpverified = true;
    user.resetotp = null;
    user.otpexpires = null;

    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const resetpassword=async(req,res)=>{
try {
    let {email,password}=req.body;
    let user=await User.findOne({email});
    if(!user){
    return res.status(400).json({
        message:"user not found"
    })
    }
    if(!user.isotpverified){
    return res.status(400).json({
        message:"Otp invalid"
    })
    }

    let hassedpassword=await bcrypt.hash(password,10);
    user.password=hassedpassword;
    user.isotpverified = false;
    user.resetotp = null;
    user.otpexpires = null;
    await user.save();

    return res.status(200).json({
    message:"password reset successfully"
})
} catch (error) {
    return res.status(500).json({
      message: error.message
    });
}
};

export const googleauth = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      if (!role) {
        return res.status(400).json({
          message: "Role is required for first-time signup"
        });
      }

      user = await User.create({
        name,
        email,
        role
      });
    }

    

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Google authentication successful",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};




