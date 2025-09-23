import { Button, ButtonBase, TextField } from '@mui/material'
import React from 'react'

const SignUp = () => {
  return (
    <div>
        <h1>sign up page</h1>
        <TextField label="name" variant="outlined"/><br /><br />
        <TextField label="age" variant="outlined"/><br /><br />
        <TextField label="password" variant="outlined"/><br /><br />
        <Button varient="contained">SignUp</Button>
       
    </div>
  )
}

export default SignUp