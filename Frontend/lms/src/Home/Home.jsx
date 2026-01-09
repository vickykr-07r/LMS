import Nav from "../Nav/Nav.jsx"
import Style from "../Home/Home.module.css"
import homeimage from "../assets//ChatGPT\ Image\ Dec\ 24\,\ 2025\,\ 12_55_39\ PM.png"
import Logos from "../Logos/Logos.jsx"
import Explore from "../Explorecourse/Explorecourse.jsx"
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa6";
import { TbTopologyRing } from "react-icons/tb";
import { SiSemanticuireact } from "react-icons/si";
import { RiMobileDownloadFill } from "react-icons/ri";
import { IoMdAnalytics } from "react-icons/io";
import { SiPreact } from "react-icons/si";
import { FaHackerrank } from "react-icons/fa";
import CardPage from "../CardPage/CardPage.jsx"
import { useNavigate } from "react-router-dom"
export function Home(){
    let navigate=useNavigate();
    return(
    <>

   <div className={Style.container}>
   <Nav />
   <div className={Style.hero}>
    <img src={homeimage} alt="hero" />
    <h1>Grow Your Skills To Advance</h1>
    <h2>Your Career Path</h2>
    <div className={Style.button}>
        <button onClick={()=>{navigate("/allcourses")}}>View All Courses</button>
        <button>Search With Ai</button>
    </div>
   </div>
   <Logos/>
   </div>
   <div className={Style.explore}>
   <div className={Style.exploreleft}>
   <h1>Explore Our Courses</h1>
   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nisi nostrum ex expedita itaque numquam odit. Ad nostrum sint consequatur.</p>
   <button>Explore Courses</button>
   </div>
   
   <div className={Style.exploreright}>
   <Explore Icon={TbDeviceDesktopAnalytics} text="Web Development" />
   <Explore Icon={FaUikit } text="UI/UX" />
   <Explore Icon={RiMobileDownloadFill } text="App Development" />
   <Explore Icon={FaHackerrank} text="App Development" />
   <Explore Icon={SiSemanticuireact} text="Ai/ML" />
   <Explore Icon={TbTopologyRing } text="Data Science" />
   <Explore Icon={IoMdAnalytics} text="Data Analytics" />
   <Explore Icon={SiPreact} text="Ai Tools" />
   </div>
   </div>
   <CardPage/>
    </>
    )
}