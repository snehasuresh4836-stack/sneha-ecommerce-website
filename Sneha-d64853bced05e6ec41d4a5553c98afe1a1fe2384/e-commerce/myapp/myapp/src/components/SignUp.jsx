import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
const SignUp = () => {

  const[enter,setEnter]=useState({Username:"",Email:"",Password:""})
  
          const navigate = useNavigate()
  
          const inputhandler=(e)=>{
          setEnter({...enter,[e.target.name]:e.target.value})
          console.log(enter)
      }
  
      const addHandler=()=>{
        axios.post("http://localhost:3005/signup",enter)
        .then((res)=>{
            
            
            if(res.data.success ===true){
                  navigate("/login")
                  console.log(res.data.message)
                  alert(res.data.message)
            }
            
        })
        .catch((err)=>{
          console.log("SignUp Error : ",err)
          alert("Connect to Network")
        })

    
    }
  
  
  return (
    <div>
        <br /><br /><br />
      <h1>SignUp Page</h1>
      <TextField label='Name' variant='outlined'name='Username' value={enter.Username} onChange={inputhandler}/> <br /><br />
      <TextField label='Email' variant='outlined'name='Email' value={enter.Email} onChange={inputhandler}/> <br /><br />
      <TextField label='Password' variant='outlined'name='Password' value={enter.Password} onChange={inputhandler}/> <br /><br />
      <br /><br />
          <Button variant='outlined'onClick={addHandler}>ENTER</Button> <br /><br />
      <Link to="/home">
       <Button variant='outlined'><LoginIcon/></Button> 
       </Link><br /><br/>
       <Link to='/login'>
       <Button variant='text'>Already have an account!! </Button>
       </Link>


      
      

    </div>
  )
}

export default SignUp
