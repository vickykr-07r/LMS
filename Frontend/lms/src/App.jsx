import './App.css'
import { Signup } from './Signup/Signup.jsx'
import { Login } from './Login/Login.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './Home/Home.jsx'
import useGetCurrentUser from './Custom Hooks/getcurrent.jsx'
import Profile from './Profile/Profile.jsx'
import { useSelector } from 'react-redux'
import ForgetPassword from './ForgetPassword/ForgetPassword.jsx'
import Editprofile from './Edit Profile/Editprofile.jsx'
import Dashboard from './Educator/Dashboard/Dashboard.jsx'
import Courses from './Educator/Courses/Courses.jsx'
import CreateCourses from './Educator/CreateCourses/CreateCourses.jsx'
import getCreatorCourses from './Custom Hooks/getCreatorCourses.jsx'
import EditCourse from './Educator/EditCourse/EditCourse.jsx'
import Allcourses from './AllCourses/Allcourses.jsx'
import Createlecture from './Educator/CreateLecture/CreateLecture.jsx'
function App() {
  useGetCurrentUser()
  getCreatorCourses()

  const { userData,loading } = useSelector(state => state.user)

  if(loading){
   return <div>Loading...</div>
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={!userData ? <Signup /> : <Navigate to="/" />}/>

        <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />}/>

        <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/login" />}/>

        <Route path='/forget' element={<ForgetPassword />} />

        <Route path='/editprofile' element={userData ? <Editprofile /> : <Navigate to="/login" />}/>

        <Route path="/dashboard" element={userData?.role === "educator" ? <Dashboard /> : <Navigate to="/login" />}/>

         <Route path='/courses' element={userData ? <Courses /> : <Navigate to="/login" />}/>

         <Route path='/allcourses' element={userData ? <Allcourses/> : <Navigate to="/login" />}/>

         <Route path='/createcourses' element={userData ? <CreateCourses /> : <Navigate to="/login" />}/>

         <Route path='/editcourse/:courseId' element={userData ? <EditCourse /> : <Navigate to="/login" />}/>

         <Route path='/createlecture/:courseId' element={userData ? <Createlecture /> : <Navigate to="/login" />}/>
      </Routes>
    </>
  )
}

export default App
