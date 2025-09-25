import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
 
    const { id } = useParams()
   const navigate = useNavigate()
   const [view, setView] = useState({
    title: '',
    content: '',
    img_url: '',  
  });
 
    useEffect(() => {
    axios.get(`http://localhost:3001/view/${id}`)
      .then(res => setView(res.data))
      .catch(err => console.error("Error loading card", err));
  }, [id])

    const handleChange = (e) => {
    const { name, value } = e.target;
    setView(prev => ({ ...prev, [name]: value }));
  }

  const handleUpdate = () => {
    axios.put(`http://localhost:3001/update/${id}`, view)
      .then(res => {
        alert("cart updated successfully!");
        navigate('/'); 
      })
      .catch(err => console.error("Error updating product", err));
  }

  return (
    <div>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 5 }}>
      <Typography variant="h5" gutterBottom>Update Cart</Typography>
      
      <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Title" name="title" value={view.title} onChange={handleChange}/>
            <TextField label="Content" name="content" value={view.content} onChange={handleChange}/>
            <TextField label="image url" name="image" value={view.img_url} onChange={handleChange}/>
        <Button variant="contained" color='secondary' onClick={handleUpdate}>
          Update
        </Button>
      </Box>
    </Paper>

    </div>
  )
}

export default Update