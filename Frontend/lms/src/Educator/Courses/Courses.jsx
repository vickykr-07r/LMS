import Style from "../Courses/Courses.module.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
function Courses(){
    return(
        <>
        <div className={Style.container}>
         <div className={Style.nav}>
          <div className={Style.left}>
            <IoMdArrowRoundBack />
            <h1>Courses</h1>
          </div>
          <div className={Style.right}>
            <button>Create Course</button>
          </div>
         </div>
         <div className={Style.courses}>
            <div className={Style.table}>
              <table>
                <tr>
                    <th>Courses</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                <tbody>
                    <tr>
                        <td><img src="" alt="" /> <span>Title</span></td>
                        <td>$199</td>
                        <td>Draft</td>
                        <td><FaRegEdit/></td>
                    </tr>
                </tbody>
            </table>
            </div>
         </div>
        </div>
        </>
    )
}

export default Courses