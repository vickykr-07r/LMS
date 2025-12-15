import mongoose from "mongoose"

async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("mongodb connected")
        })
    } catch (error) {
        console.log(`error on connecting mongodb ${error}`)
    }
}

export default connect;