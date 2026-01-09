import { useSelector } from "react-redux";
import Style from "../CardPage/CardPage.module.css"
import { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
function CardPage(){
    let {creatorCoursesData}=useSelector(state=>state.course)
    let [popularcourse,setPopularcourse]=useState([]);
    useEffect(()=>{
        setPopularcourse(creatorCoursesData.slice(0,6))
    },[creatorCoursesData])
    return(
        <>
        <div className={Style.cardsbox}>
  <h1>Our Popular Courses</h1>
  <p>Discover our popular courses that combine expert guidance, practical projects, and easy-to-follow lessons. Whether you’re starting out or upgrading your skills, these courses are built to support your growth and help you succeed in today’s competitive world.</p>

  <div className={Style.grid}>
    {popularcourse.map((item, index) => (
      <Cards key={index} {...item} />
    ))}
  </div>
</div>

        </>
    )
}

export default CardPage;