import Style from "../Dashboard/Dashboard.module.css"
function Dashboard(){
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
             <button>Create Course</button>
           </div>
          </div>
         </div>
        </div>
        </>
    )
}

export default Dashboard;