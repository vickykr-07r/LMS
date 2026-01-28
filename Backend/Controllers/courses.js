import Course from "../Models/courseModel.js";
import uploadoncloudinary from "../Config/Cloudinary.js";
import Lecture from "../Models/lectureModel.js";
export const createCourse=async(req,res)=>{
    try {
        let{title,category}=req.body;
        if(!title || !category){
            return res.status(400).json({
            message:"title or category is required"
            })
        }

        const course = await Course.create({
            title,category,creator:req.userId
        })

        return res.status(200).json(course)
    } catch (error) {
         return res.status(500).json({
      message: error.message
    });
    }
}

export const getpublishedcourse=async(req,res)=>{
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

export const getcreatorcourses=async(req,res)=>{
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

export const editcourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, subtitle, description, category, level, ispublished, price } = req.body;

    let thumbnail;

   
    if (req.file) {
      const uploadResult = await uploadoncloudinary(req.file.path);
      thumbnail = uploadResult
    }

    const updatecourse = {
      title,
      subtitle,
      description,
      category,
      level,
      ispublished,
      price,
    };

    if (thumbnail) {
      updatecourse.thumbnail = thumbnail;
    }

    const course = await Course.findByIdAndUpdate(
      courseId,
      updatecourse,
      { new: true }
    );

    return res.status(200).json(course);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getcoursebyid=async(req,res)=>{
try {
    let {courseId}=req.params;
    let course=await Course.findById(courseId);
    if(!course){
        return res.status(400).json({
            message:"course not found"
        })
    }
    return res.status(200).json(course)
} catch (error) {
    return res.status(500).json({
      message: error.message
    });
}
}

export const removecourse=async(req,res)=>{
    try {
        let {courseId}=req.params;
    let course=await Course.findById(courseId);
    if(!course){
        return res.status(400).json({
            message:"course not found"
        })
    }
    course=await Course.findByIdAndDelete(courseId,{new:true})
    return res.status(200).json({
        message:"course removed"
    })
    } catch (error) {
        return res.status(500).json({
      message: error.message
    });
    }
}

export const createlecture=async(req,res)=>{
try {
    const {lecturetitle}=req.body;
    const {courseId}=req.params;
    if(!lecturetitle || !courseId){
        return res.status(400).json({
            message:"lecturetitle is required"
        })
    }
    const lecture = await Lecture.create({ lecturetitle: lecturetitle})
    const course=await Course.findById(courseId)
    if(course){
        course.lectures.push(lecture._id)
    }
    course.populate("lectures")
    course.save()
    return res.status(201).json({lecture,course})
} catch (error) {
    return res.status(500).json({
        message:`failed to create Lecture ${error}`
    })
}
}

export const getcourselecture=async(req,res)=>{
try {
    let {courseId}=req.params;
    const course=await Course.findById(courseId);
    if(!course){
        return res.status(400).json({
            message:"Course is not found"
        })
    }
    await course.populate("lectures")
    await course.save();
    return res.status(200).json(course)
} catch (error) {
    return res.status(500).json({
        message:`failed to create lecture ${error}`
    })
}
}

export const editlecture=async(req,res)=>{
try {
    let {lectureId}=req.params;
    const {ispreviewfree,lecturetitle}=req.body
    const lecture=await Lecture.findById(lectureId);
    if(!lecture){
         return res.status(400).json({
            message:"Course is not found"
        })
    }
    let videourl;
    if(req.file){
        videourl=await uploadoncloudinary(req.file.path)
    }
    lecture.videourl=videourl;
    lecture.ispreviewfree=ispreviewfree;
    lecture.lecturetitle=lecturetitle;
    await lecture.save();
    return res.status(200).json(lecture)
} catch (error) {
    return res.status(500).json({
        message:`failed to edit lecture ${error}`
    })
}
}

export const removelecture=async(req,res)=>{
    try {
        let {lectureId} =req.params;
        const lecture=await Lecture.findByIdAndDelete(lectureId)
        if(lecture){
            return res.status(400).json({
                message:"Lecture is not found"
            })
        }
        await Course.updateOne(
            {lectures:lectureId},
            {$pull:{lectures:lectureId}}
        )
        return res.status(200).json({message:"Lecture Removed"})
    } catch (error) {
        return res.status(500).json({
        message:`failed to remove lecture ${error}`
    })
    }
}