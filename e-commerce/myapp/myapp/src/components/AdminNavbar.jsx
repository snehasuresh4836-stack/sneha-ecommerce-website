import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
        >
          JASS &nbsp;&nbsp;&nbsp;&nbsp;
        </Typography>
            <Link to='/addproduct'>
        <Button variant='contained'>Add</Button>
        </Link> &nbsp; &nbsp;
        <Link to='/viewproduct'>
        <Button variant='contained'>View</Button>
        </Link>&nbsp; &nbsp;
        <Link to='/vieworder'>
        <Button variant='contained'>Order</Button>
        </Link> &nbsp; &nbsp;
        <Link to='/viewuser'>
        <Button variant='contained'>User</Button>
        </Link> &nbsp; &nbsp;
        <Link to='/login'>
        <Button variant='contained'>LogOut</Button>
        </Link>&nbsp;&nbsp;
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AdminNavbar
