import Course from "../Models/courseModel.js";
import uploadoncloudinary from "../Config/Cloudinary.js";
const createCourse=async(req,res)=>{
    try {
        let{title,category}=req.body;
        if(!title || !category){
            return res.status(400).json({
            message:"title or category is required"
            })
        }

        const course = await Course.create({
            title,description,creator:req.userId
        })

        return res.status(200).json(course)
    } catch (error) {
         return res.status(500).json({
      message: error.message
    });
    }
}

const getpublishedcourse=async(req,res)=>{
    try {
        const course=await Course.find({ispublished:true})
        if(!course){
            return res.status(400).json({
                message:"courses not found"
            })
        }
        return res.status(200).json(course)
    } catch (error) {
          return res.status(500).json({
      message: error.message
    });
    }
}

const getcreatorcourses=async(req,res)=>{
try {
    const course=await Course.find({creator:req.userId})
     if(!course){
        return res.status(400).json({
        message:"courses not found"
        })
     }
    
    return res.status(200).json(course)
} catch (error) {
    return res.status(500).json({
      message: error.message
    });
}
}

const editcourse=async(req,res)=>{
try {
    let {courseId}=req.params;
    let {title,subtitle,description,category,level,ispublished,price}=req.body;
    let thumbnail
    if(thumbnail){
        thumbnail=await uploadoncloudinary(req.file.path)
    }
    let updatecourse = {title,subtitle,description,category,level,ispublished,price,thumbnail}
    let course=await Course.findByIdAndUpdate(courseId,updatecourse,{new:true})
    return res.status(200).json(course)
} catch (error) {
    return res.status(500).json({
      message: error.message
    });
}
}