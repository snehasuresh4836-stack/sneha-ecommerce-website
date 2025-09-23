import React, { Profiler } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Profile from './components/Profile'
import  './App.css'
import Home from './components/Home'
import Cart from './components/Cart'
import Payment from './components/Payment'

import AddProduct from './components/AddProduct'
import ViewProduct from './components/ViewProduct'
import ViewOrder from './components/ViewOrder'
import ViewUser from './components/ViewUser'


const App = () => {
  return (
    <div>
     

      <Routes>
        <Route path="/login" element={<Login/>}/> 
        <Route path="/" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/Payment" element={<Payment/>}/>
        <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/viewproduct" element={<ViewProduct/>}/>
         <Route path="/vieworder" element={<ViewOrder/>}/>
         <Route path="/viewuser" element={< ViewUser/>}/>

        
       
      </Routes>
    
      
      
    </div>
  )
}

export default App
