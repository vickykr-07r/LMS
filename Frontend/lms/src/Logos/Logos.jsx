import Style from "../Logos/Logos.module.css"
import { MdCastForEducation } from "react-icons/md";
import { TiLockOpen } from "react-icons/ti";
import { IoIosPeople } from "react-icons/io";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { TbMoneybag } from "react-icons/tb";
function Logos(){
    return(
        <>
        <div className={Style.container}>
        <span><MdCastForEducation />20k+ Onlines Courses</span>
        <span><TiLockOpen />Lifetime Access</span>
        <span><TbMoneybag />Value For Money</span>
        <span><TfiHeadphoneAlt />LifeTime Support</span>
        <span><IoIosPeople />Community Support</span>
        </div>
        </>
    )
}

export default Logos