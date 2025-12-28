import uploadoncloudinary from "../Config/Cloudinary.js"
import User from "../Models/user.models.js"


export const currentuser=async(req,res)=>{
try {
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

export const editprofile = async (req, res) => {
  try {
    const { description, name } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    let image = user.photourl;

    if (req.file) {
      image = await uploadoncloudinary(req.file.path);
    }

    user.name = name;
    user.description = description;
    user.photourl = image;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
