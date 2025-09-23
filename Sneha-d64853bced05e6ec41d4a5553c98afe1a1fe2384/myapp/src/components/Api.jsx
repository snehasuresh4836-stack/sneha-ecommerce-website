import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import axios from 'axios';
import { Grid } from '@mui/material';
        
const Api = () => {
    var[product,setProduct]=useState([])
    axios.get("https://fakestoreapi.com/products")
    .then((res)=>{
        console.log(res.data)
        setProduct(res.data)
    })
  return (
    <div>
      <Grid container spacing={2}>
      {product.map((val)=>{
        return( 
         
          
         <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={val.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
       {val.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {val.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>             
    </Card>
    
    
    )
  })}
  </Grid>
    </div>
  )
}

export default Api