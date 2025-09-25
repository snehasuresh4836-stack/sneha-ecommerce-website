import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate()
  var[view,setView]=useState([])
    axios.get("http://localhost:3001/get")
    .then((res)=>{
        console.log(res.data)
        setView(res.data)
    })
    const delValue=(id)=>{
        axios.delete("http://localhost:3001/delete/"+ id)
        .then((res)=>{
            alert(res.data)
            window.location.reload()
        })
    }

  return (
    <div>
      <br /><br /><br />
      <Grid container spacing={2}>
      {view.map((val)=>{
          return(
            
            <Grid key={val.id} item xs={12} sm={6} md={4} >
        <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={val.img_url}
        title="Image"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {val.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
            {val.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" onClick={()=>{delValue(val._id)}} >DELETE</Button>
        <Button variant="contained" color="secondary" onClick={() => navigate(`/update/${val._id}`)}>UPDATE</Button>
      </CardActions>
    </Card>
    </Grid>
      )
      })}
      </Grid>
    </div>
  )
}

export default Home