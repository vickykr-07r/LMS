import jwt from "jsonwebtoken"

export const isAuth =async(req,res,next)=>{
try {
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }
    const verifytoken=jwt.verify(token,process.env.SECRET_KEY)
    
    console.log(verifytoken)

    req.userId=verifytoken.id

    next();
} catch (error) {
    return res.status(401).json({
        message:"invalid or expired token"
    })
}
}