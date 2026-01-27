import Style from "../CreateLecture/CreateLecture.module.css"
function Createlecture(){
    return(
        <>
        <div className={Style.container}>
        <div className={Style.box}>
        <div className={Style.heading}>
        <h1>Lets's Add a Lecture</h1>
        <p>Enter The Title And Add Your Video Lectures To Enchances Your Course Content</p>
        </div>
        
        <input type="text" placeholder="e.g. Introduction to mern stack" />
        <div className={Style.button}>
             <button>Back To Course</button>
         <button>Create Lectures</button>
        </div>
        
        <div className={Style.lecturedetail}>
         <p>Lecture -1 : Introduction to Backend</p>
         <p>Lecture -2 : How to setup Node js</p>
        </div>

        </div>
        </div>
        </>
    )
}

export default Createlecture;