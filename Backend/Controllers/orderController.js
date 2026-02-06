import Razorpay  from 'razorpay';
import dotenv from "dotenv"
import Course from '../Models/courseModel.js';
import User from '../Models/user.models.js';
dotenv.config();
var Razorpayinstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const RazorpayOrder=async (req,res)=>{
    try {
        const {courseId}=req.body
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                message:"Course is not found"
            })
        }

        const options={
          amount:course.price*100,
          currency:'INR',
          receipt:`${courseId}.toString()`
        }

        const order=await Razorpayinstance.orders.create(options)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json({
        message:`failed to create Razorpay Order ${error}`
        })
    }
}

export const verifypayment=async(req,res)=>{
try {
    const {courseId,userId,razorpay_order_id}=req.body
    const orderInfo =await Razorpayinstance.orders.fetch(razorpay_order_id)

    if(orderInfo.status==='paid'){
        const user=await User.findById(userId)
        if(!user.enrolledcourses.includes(courseId)){
            await user.enrolledcourses.push(courseId)
            await user.save();
        }
        const course=await Course.findById(courseId).populate("lectures")
        if(!course.enrolledstudents.includes(userId)){
            await course.enrolledstudents.push(userId)
            await course.save();
        }
        return res.status(200).json({
            message:"payment verified and enrollment successful"
        })
    }else{
        return res.status(400).json({
            message:"payment failed"
        })
    }
} catch (error) {
    return res.status(500).json({
        message:`Internal Server error during payment verification ${error}`
        })
}
}