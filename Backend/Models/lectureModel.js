import mongoose from "mongoose"

const lectureSchema=new mongoose.Schema({
    lecturetitle:{
        type:String,
    },
    videourl:{
        type:String
    },
    ispreviewfree:{
        type:Boolean
    }
},{timestamps:true})

let Lecture=mongoose.model("Lecture",lectureSchema);

export default Lecture