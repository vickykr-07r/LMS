import Style from "../AllCourses/AllCourses.module.css"
import Nav from "../Nav/Nav.jsx"
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSearchPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards.jsx";
function Allcourses(){
    let { creatorCoursesData}=useSelector(state=>state.course);
    const [category,setCategory]=useState([])
    const [filtercourse,setFilterCourse]=useState([])

    const toggleCategory=(e)=>{
     if(category.includes(e.target.value)){
        setCategory(prev=> prev.filter(c=>c!==e.target.value))
     }else{
        setCategory(prev =>[...prev,e.target.value])
     }
    }
     
    const applyfilter=()=>{
        let coursecopy=creatorCoursesData?.slice()
        if( category.length>0){
            coursecopy=coursecopy.filter(c=>category.includes(c.category))
        }
        setFilterCourse(coursecopy)
    }

    useEffect(()=>{
        setFilterCourse(creatorCoursesData)
    },[creatorCoursesData])
     useEffect(()=>{
        applyfilter();
    },[category])
    return(
        <>
          <Nav/>
        <div className={Style.container}>
        <div className={Style.left}>
          <IoMdArrowRoundBack />
          <h1>Filter By Category</h1>
          <div className={Style.leftbox}>
           <button>Search By Ai <FaSearchPlus /></button>
           <div className={Style.checkbox}>

                    <input type="checkbox" value={"WebDevelopment"} onChange={toggleCategory}/>
                    <label htmlFor="">Web Development</label>
                 
                    <input type="checkbox" value={"UI/UX"} onChange={toggleCategory}/>
                    <label htmlFor="">UI/UX</label>
                 
                    <input type="checkbox" value={"AppDevelopment"} onChange={toggleCategory}/>
                    <label htmlFor="">App Development</label>
               
                    <input type="checkbox" value={"AI/ML"} onChange={toggleCategory}/>
                    <label htmlFor="">AI/ML</label>
                
                    <input type="checkbox" value={"DataScience"} onChange={toggleCategory}/>
                    <label htmlFor="">Data Science</label>
                
                    <input type="checkbox" value={"DataAnalytics"} onChange={toggleCategory}/>
                    <label htmlFor="">Data Analytics</label>
               
                    <input type="checkbox" value={"AITools"} onChange={toggleCategory}/>
                    <label htmlFor="">AI Tools</label>
                
                    <input type="checkbox" value={"Other"} onChange={toggleCategory}/>
                    <label htmlFor="">Other</label>
             </div>      
          </div>
        </div>
        <div className={Style.right}>
           {filtercourse.map((item, index) => (
      <Cards key={index} {...item} />
    ))}
        </div>
        </div>
        </>
    )
}

export default Allcourses