import { useDispatch, useSelector } from "react-redux";
import Style from "../ViewCourses/viewcourses.module.css"
import { setSelectedCourse } from "../../Redux/courseSlice";
import { useContext, useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../assets/360_F_1782566901_cVPHOOg5fMRbCKNX61r4MG5okjv7KS2a.jpg"
import axios from "axios";
import { ServerContext } from "../../Context/Context";
import Cards from "../../Cards/Cards";
function ViewCourses(){
    let {serverurl}=useContext(ServerContext)
   let {courseId}=useParams();
    let {creatorCoursesData}=useSelector(state=>state.course)
    let {selectedCourse}=useSelector(state=>state.course)
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let [creatorData,setCreatorData]=useState();
    let[isEnrolled,setIsEnrolled]=useState(false);
    const [creatorCourses,setCreatorCourses]=useState(null);
    console.log(selectedCourse)
    const {userData}=useSelector(state=>state.user)
    const fetchCourseData=async()=>{
     creatorCoursesData.map((course)=>{
             if(course._id==courseId){
                dispatch(setSelectedCourse(course))
                console.log(selectedCourse)
             }
     })
    }
     
    const checkEnrollment=()=>{
      const verify = userData?.enrolledcourses?.some(c=>
      (typeof c==='string' ? c:c._id).toString()===courseId?.toString())
      if(verify){
        setIsEnrolled(true);
      }
    }
    useEffect(()=>{
        fetchCourseData()
        checkEnrollment()
    },[creatorCoursesData,courseId])

    useEffect(()=>{
        const handleCreator=async()=>{
        if(selectedCourse?.creator){
        try {
            let result = await axios.post(`${serverurl}/api/course/creator`,{userId:selectedCourse?.creator},{withCredentials:true})
            setCreatorData(result.data)
          
        } catch (error) {
            console.log(error)
        }
        }
      }

      handleCreator();
    },[selectedCourse])

    useEffect(()=>{
      if (creatorData?._id && creatorCoursesData.length > 0) {
  const creatorCourses = creatorCoursesData.filter((course) => {
    return course.creator === creatorData._id && course._id !== courseId;
  });

  setCreatorCourses(creatorCourses);
}

    },[creatorData,creatorCoursesData])

    const handleEnroll=async(userId,courseId)=>{
      try {
        const orderData=await axios.post(`${serverurl}/api/order/razorpay-order`,{userId,courseId},{withCredentials:true})
        console.log(orderData)

        const options={
          key:import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount:orderData.data.amount,
          currency:'INR',
          name:"VICKY KUMAR",
          description:"COURSE ENROLLMENT PAYMENT",
         order_id: orderData.data.id,
          handler:async function(response){
            console.log("Razorpay Response",response)
            try {
              const verifypayment=await axios.post(`${serverurl}/api/order/verifypayment`,{...response,courseId,userId},{withCredentials:true})
             console.log(verifypayment.data.message)
             setIsEnrolled(true);
            } catch (error) {
              console.log(error)
            }
          }
          
        }

        const rzp=new window.Razorpay(options)
        rzp.open()
      } catch (error) {
        console.log(error)
      }
    }
    return(
        <>
        <div className={Style.container}>
            <div className={Style.topsection}>
              <div className={Style.back} onClick={()=>{navigate("/")}}>
               <IoMdArrowBack />
              </div>
              <div className={Style.left}>
             {selectedCourse?.thumbnail ? <img src={selectedCourse.thumbnail} alt="" /> :<img src={image}/>}
              </div>
              <div className={Style.right}>
                <div className={Style.rightdata}>
                 <h1>{selectedCourse?.title}</h1>
                <h2>{selectedCourse?.subtitle}</h2>
                <h3>price:{selectedCourse?.price}</h3>
                <p>10+ hours of video content</p>
                <p>Lifetime access to course materials</p>
                 {!isEnrolled &&
                <button onClick={()=>{handleEnroll(userData._id,courseId)}}>Enroll Now</button>
                 }
                  {isEnrolled &&
                <button onClick={()=>{navigate(`/viewlecture/${courseId}`)}}>Watch Now</button>
                 }

                </div>
               

              </div>
            </div>

            <div className={Style.coursedetail}>
                <div className={Style.coursedetailfirst}>
                 <h1>What you'll learn </h1>
            <ul>
                <li>
                    Learn {selectedCourse?.category} from Beginning
                </li>
            </ul>
                </div>
            
             <div className={Style.coursedetailsec}>
             <h1>Who This Course Is For</h1>
            <p>Beginner ,aspiring developers and professionals looking to upgrade skills</p>
             </div>
            
            <div className={Style.coursedetailsec}>
                <h1> Course Curriculum</h1>
            <p>{selectedCourse?.lectures?.length} lectures</p>
            
            </div>
          
            </div>
            <hr />
            <div className={Style.review}>
             <h1>Write Your Review</h1>

            <div className={Style.stars}>
            {[1, 2, 3, 4, 5].map((index) => {
            return <IoStar key={index} />;
            })}
            </div>

             <textarea placeholder="Write Your Review Here" />
            <button>Submit Review</button>
            </div>
             <hr />

             <div className={Style.creatordata}>
                <div className={Style.creatordataleft}>
                 {creatorData?.photourl ? <img src={creatorData?.photourl}/>:<img src="https://th.bing.com/th/id/OIP.rkdWfkfBqs47aAp8fEjC2QHaJU?w=150&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"/>}
                </div>
                <div className={Style.creatordataright}>
                 <h1>{creatorData?.name}</h1>
                 <h2>{creatorData?.email}</h2>
                 <h3>{creatorData?.description}</h3>
                </div>
             </div>
             <div className={Style.Cards}>
  <h1>Other Published Course By Educator</h1>

  <div className={Style.cardGrid}>
    {creatorCoursesData?.map((course) => (
      <Cards
        key={course._id}
        thumbnail={course.thumbnail}
        title={course.title}
        category={course.category}
        price={course.price}
        id={course._id}
      />
    ))}
  </div>
</div>

        </div>
        </>
    )
}

export default ViewCourses