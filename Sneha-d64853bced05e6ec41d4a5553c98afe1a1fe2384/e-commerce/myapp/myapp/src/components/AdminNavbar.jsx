import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div>
      <AppBar   sx={{
        background: "linear-gradient(90deg, #1e3c72, #2a5298)", // gradient navbar
        boxShadow: 3,
      }}>
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
        <Button variant="contained"
          component={Link}
          to="/addproduct"
          sx={{ mx: 1, backgroundColor: "#27ae60", "&:hover": { backgroundColor: "#1e8449" } }}>Add</Button>
        </Link> &nbsp; &nbsp;
        <Link to='/viewproduct'>
        <Button  variant="contained"
          component={Link}
          to="/viewproduct"
          sx={{ mx: 1, backgroundColor: "#2980b9", "&:hover": { backgroundColor: "#21618c" } }}>View</Button>
        </Link>&nbsp; &nbsp;
        <Link to='/vieworder'>
        <Button variant="contained"
          component={Link}
          to="/vieworder"
          sx={{ mx: 1, backgroundColor: "#e67e22", "&:hover": { backgroundColor: "#ca6f1e" } }}>Order</Button>
        </Link> &nbsp; &nbsp;
        
        <Link to='/login'>
        <Button  variant="contained"
          component={Link}
          to="/login"
          sx={{ mx: 1, backgroundColor: "#c0392b", "&:hover": { backgroundColor: "#922b21" } }}>LogOut</Button>
        </Link>&nbsp;&nbsp;
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AdminNavbar
