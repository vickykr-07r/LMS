import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
name:{
    type:String,
},
description:{
    type:String,
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:["student","educators"],
    required:true
},
photourl:{
    type:String,
    default:""
},
enrolledcourses:[{
type:mongoose.Schema.Types.ObjectId,
ref:"Course"
}]
},{timestamps:true})

const User =mongoose.model("User",userSchema)

export default User