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
function App() {
  useGetCurrentUser()

  const { userData,loading } = useSelector(state => state.user)

  if(loading){
   return <div>Loading...</div>
  }
  console.log(userData)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={!userData ? <Signup /> : <Navigate to="/" />}/>

        <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />}/>

        <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/login" />}/>

        <Route path='/forget' element={<ForgetPassword />} />

        <Route path='/editprofile' element={userData ? <Editprofile /> : <Navigate to="/login" />}/>
      </Routes>
    </>
  )
}

export default App
