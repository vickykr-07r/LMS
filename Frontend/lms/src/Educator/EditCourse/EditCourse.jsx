import { IoMdArrowRoundBack } from "react-icons/io";
import Style from "../EditCourse/EditCourse.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ServerContext } from "../../Context/Context";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCoursesData } from "../../Redux/courseSlice";

function EditCourse() {
  const ref = useRef();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { serverurl } = useContext(ServerContext);

  const [courseData, setCourseData] = useState(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [courselevel, setcourselevel] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [publish, setPublish] = useState(false);
  const [selectCourse,setSelectCourse]=useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const dispatch=useDispatch();
  const {creatorCoursesData} = useSelector(state=>state.course)

  function handleimage(e) {
    const image = e.target.files[0];
    if (!image) return;
    setThumbnail(image);
  }

  useEffect(() => {
    async function getcoursebyid() {
      try {
        setPageLoading(true);
        const result = await axios.get(
          `${serverurl}/api/course/getcoursebyid/${courseId}`,
          { withCredentials: true }
        );
        setCourseData(result.data);
        setSelectCourse(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoading(false);
      }
    }
    getcoursebyid();
  }, [courseId, serverurl]);

  useEffect(() => {
    if (courseData) {
      setTitle(courseData.title || "");
      setSubtitle(courseData.subtitle || "");
      setDescription(courseData.description || "");
      setCategory(courseData.category || "");
      setcourselevel(courseData.level || "");
      setPrice(courseData.price || "");
      setPublish(courseData.ispublished || false);
    }
  }, [courseData]);

  async function handlesubmit(e) {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", courselevel);
    formData.append("price", price);
    formData.append("ispublished", publish);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      let result=await axios.post(`${serverurl}/api/course/editcourse/${courseId}`,formData,{withCredentials: true});
      let updateData=result.data
      if(updateData.ispublished){
        const updateCourses=creatorCoursesData.map((c)=>{
           return c._id===courseId ? updateData :c ;
        })

        if(!creatorCoursesData.some((c)=>{
        return c._id ===courseId
        }))
        updateCourses.push(updateData)
        dispatch(setCreatorCoursesData(updateCourses))
      }else{
        const filtercourse=creatorCoursesData.filter((c)=>{
      return c._id != courseId
      })
         dispatch(setCreatorCoursesData(filtercourse))
      }
      navigate("/courses");
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  }

  async function handledelete() {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    setDeleteLoading(true);
    try {
      await axios.delete(
        `${serverurl}/api/course/remove/${courseId}`,
        { withCredentials: true }
      );

      const filtercourse=creatorCoursesData.filter((c)=>{
      return c._id != courseId
      })
       dispatch(setCreatorCoursesData(filtercourse))
      navigate("/courses");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <div className={Style.pageLoader}>
        <ClipLoader size={55} color="#4f46e5" />
      </div>
    );
  }

  return (
    <div className={Style.container}>
      <div className={Style.box}>
        <div className={Style.nav}>
          <div className={Style.navleft}>
            <IoMdArrowRoundBack onClick={() => navigate(-1)} />
            <h1>Edit Courses</h1>
          </div>
          <div className={Style.navright}>
            <button onClick={()=>{navigate(`/createlecture/${selectCourse?._id}`)}}>Go To Lecture Page</button>
          </div>
        </div>

        <div className={Style.courseinfo}>
          <h1>Basic Course Information</h1>

          <div className={Style.button2}>
            <div onClick={() => setPublish(prev => !prev)}>
              {publish ? (
                <button className={Style.true}>Published</button>
              ) : (
                <button className={Style.false}>Draft</button>
              )}
            </div>

            <button onClick={handledelete} disabled={deleteLoading}>
              {deleteLoading ? (
                <ClipLoader size={16} color="#fff" />
              ) : (
                "Remove Course"
              )}
            </button>
          </div>

          <div className={Style.form}>
            <label>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} />

            <label>Subtitle</label>
            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} />

            <label>Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="WebDevelopment">Web Development</option>
              <option value="UI/UX">UI/UX</option>
              <option value="AppDevelopment">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="DataScience">Data Science</option>
              <option value="Other">Other</option>
            </select>

            <label>Course Level</label>
            <select
              value={courselevel}
              onChange={e => setcourselevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <label>Price (INR)</label>
            <input value={price} onChange={e => setPrice(e.target.value)} />

            <label>Course Thumbnail</label>
            <input
              type="file"
              hidden
              accept="image/*"
              ref={ref}
              onChange={handleimage}
            />
            <img
              src={
                thumbnail
                  ? URL.createObjectURL(thumbnail)
                  : "https://via.placeholder.com/300x180?text=Upload+Image"
              }
              alt="thumbnail"
              onClick={() => ref.current.click()}
            />

            <button onClick={() => navigate("/courses")}>Cancel</button>

            <button onClick={handlesubmit} disabled={btnLoading}>
              {btnLoading ? (
                <ClipLoader size={18} color="#fff" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
