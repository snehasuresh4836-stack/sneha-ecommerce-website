import { Button } from '@mui/material'
import React, { useState } from 'react'

const New = () => {
  var [name,setname]=useState()
  const input1=()=>{
    setname(" REACT")
  }
  const input2=()=>{
    setname(" ANGULAR")
  }
  const input3=()=>{
    setname(" NEST")
  }


  return (
    <div>
        <h1>WELCOME{name}</h1>
        <Button variant='contained' color='secondary' onClick={input1}>REACT</Button>&nbsp;&nbsp;
         <Button variant='contained' color='error' onClick={input2}>ANGULAR</Button>&nbsp;&nbsp;
          <Button variant='contained' color='success'onClick={input3}>NEST</Button>&nbsp;&nbsp;



     </div>
  )
}

export default New