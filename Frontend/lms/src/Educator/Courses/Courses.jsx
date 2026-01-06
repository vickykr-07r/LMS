import Style from "../Courses/Courses.module.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Courses(){
  let navigate=useNavigate();
  let {creatorCoursesData}=useSelector(state=>state.course)
    return(
        <>
        <div className={Style.container}>
         <div className={Style.nav}>
          <div className={Style.left}>
            <IoMdArrowRoundBack />
            <h1>Courses</h1>
          </div>
          <div className={Style.right}>
            <button onClick={()=>{navigate("/createcourses")}}>Create Course</button>
          </div>
         </div>
         <div className={Style.courses}>
            <div className={Style.table}>
             <table>
  <thead>
    <tr>
      <th>Courses</th>
      <th>Price</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {creatorCoursesData.map((item, index) => (
      <tr key={index}>
        <td>
          <img src="" alt="" />
          <span>{item.title}</span>
        </td>
        <td>${item.price}</td>
        <td>{item.ispublished ? "published" : "draft"}</td>
        <td><FaRegEdit /></td>
      </tr>
    ))}
  </tbody>
</table>

            </div>
         </div>
        </div>
        </>
    )
}

export default Courses