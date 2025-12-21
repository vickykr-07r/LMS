import './App.css'
import { Signup } from './Signup/Signup.jsx'
import { Login } from './Login/Login.jsx'
import { Routes,Route, Navigate } from 'react-router-dom'
import { Home } from './Home/Home.jsx'
import GetCurrentUser from './Custom Hooks/getcurrent.jsx'
import Profile from './Profile/Profile.jsx'
import { useSelector } from 'react-redux'
import ForgetPassword from './ForgetPassword/ForgetPassword.jsx'
function App() {
GetCurrentUser()
let {userData}=useSelector(state=>state.user)
  return (
  <>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={!userData ? <Signup/>:<Navigate to={"/"}/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/profile' element={userData ? <Profile/>:<Navigate to={"/signup"}/>}/>
    <Route path='/forget' element={ <ForgetPassword/>}/>
  </Routes>
  </>
  )
}

export default App
