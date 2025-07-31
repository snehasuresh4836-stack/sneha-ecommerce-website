import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import StateBasics from './components/StateBasics'
import New from './components/New'
import Api from './components/Api'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
     <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<SignUp/>}/>
      <Route path ='/state' element= {<StateBasics/>}/>
      <Route path ='/New' element= {<New/>}/>
      <Route path ='/Api' element= {<Api/>}/>
     </Routes>
      
    </>
  )
}

export default App
