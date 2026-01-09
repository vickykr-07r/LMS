import Style from "../Cards/Cards.module.css"
import { FaStar } from "react-icons/fa6";
function Cards({thumbnail,title,category,price,id}){
    return(
        <>
        <div className={Style.box}>
            <div className={Style.upside}>
                 <img src={thumbnail} alt="" />
            </div>
    
       <div className={Style.downside}>
         <h1>{title}</h1>
         <span>{category}</span>
         <div className={Style.footer}>
          <h2>₹{price}</h2>
          <FaStar />
         </div>
        </div>
        </div>
        </>
    )
}

export default Cards