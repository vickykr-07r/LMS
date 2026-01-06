import Style from "../Dashboard/Dashboard.module.css"
import Courses from "../Courses/Courses.jsx";
import { useNavigate } from "react-router-dom";
function Dashboard(){
  let navigate=useNavigate();
    return(
        <>
        <div className={Style.container}>
         <div className={Style.box}>
          <div className={Style.up}>
           <div className={Style.leftup}>
            <img src="" alt="" />
           
           </div>
           <div className={Style.right}>
             <h1>Welcome {}</h1>
             <h2>Total Earning : 0</h2>
             <span>Full Stack Developer</span>
             <button onClick={()=>{navigate("/courses")}}>Create Course</button>
           </div>
          </div>
         </div>
        </div>
        </>
    )
}

export default Dashboard;