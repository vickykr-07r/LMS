import Nav from "../Nav/Nav.jsx"
import Style from "../Home/Home.module.css"
import homeimage from "../assets//ChatGPT\ Image\ Dec\ 24\,\ 2025\,\ 12_55_39\ PM.png"
import Logos from "../Logos/Logos.jsx"
export function Home(){
    return(
    <>
    
   <div className={Style.container}>
  <Nav />
  <div className={Style.hero}>
    <img src={homeimage} alt="hero" />
    <h1>Grow Your Skills To Advance</h1>
    <h2>Your Career Path</h2>
    <div className={Style.button}>
        <button>View All Courses</button>
        <button>Search With Ai</button>
    </div>
  </div>
<Logos/>
</div>

    
    
    </>
    )
}