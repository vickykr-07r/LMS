import User from "../Models/user.models.js"
export const currentuser=async(req,res)=>{
try {
    console.log(req.userId )
    const user = await User.findById(req.userId).select("-password")
    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }
    return res.status(200).json(user)
} catch (error) {
    return res.status(500).json({
        message:"server error"
    })
}
}