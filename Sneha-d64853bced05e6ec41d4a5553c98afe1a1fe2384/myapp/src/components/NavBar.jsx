import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'
import { Link, Links } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
    <AppBar color='secondary'>
      <Toolbar>
        <h4>myapp</h4>&nbsp;&nbsp;
        <Link to="/login">
        <Button variant='contained'>Login</Button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/">
        <Button variant='contained'>SignUp</Button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/State">
        <Button variant='contained'>State</Button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/New">
        <Button variant='contained'>New</Button></Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/Api">
        <Button variant='contained'>Api</Button></Link>&nbsp;&nbsp;
        
        
        
        
      </Toolbar>

    </AppBar>
    </div>
  )
}

export default NavBar