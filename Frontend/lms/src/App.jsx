import './App.css'
import { Signup } from './Signup/Signup.jsx'
import { Login } from './Login/Login.jsx'
import { Routes,Route } from 'react-router-dom'
import { Home } from './Home/Home.jsx'
function App() {

  return (
  <>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
  </Routes>
  </>
  )
}

export default App
