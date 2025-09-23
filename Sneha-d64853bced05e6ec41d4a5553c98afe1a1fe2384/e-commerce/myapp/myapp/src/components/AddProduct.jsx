import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import AdminNavbar from './AdminNavbar'

const AddProduct = () => {
  const[product,setProduct]=useState({productname:"",description:"",price:"",image:""})
  const inputHandler=(e)=>{
      setProduct({...product,[e.target.name]:e.target.value})
      console.log(product)
  }
  const addHandler=()=>{
        axios.post("http://localhost:3005/add/product",product)
        .then((res)=>{
            alert(res.data)
            console.log(res.data)
            window.location.reload()
    })
    .catch((err)=>{
      console.log("SignUp Error : ",err)
      alert(err.message)
    })

  }
  return (
    <div>
        <div>
        <AdminNavbar/><br/><br/><br/>
        </div>
        <label>ADD NEW PRODUCT</label><br/><br />
        
        <TextField
        variant='outlined'
        name='productname'
        label='Product Name'
        onChange={inputHandler}
        value={product.productname}
        />
        <br/><br/>
        <TextField
        variant='outlined'
        name='description'
        label='Description'
        value={product.description}
        onChange={inputHandler}
        />
        <br/>
        <br/>
        <TextField
        variant='outlined'
        label='price'
        name='price'
        value={product.price}
        onChange={inputHandler}
        />
        <br/>
        <br/>
        <TextField
        variant='outlined'
        name='image'
        label='Image Link'
        value={product.image}
        onChange={inputHandler}
        />
        <br/>
        <br/>
        <Button variant='contained' color='warning' onClick={addHandler}>ADD</Button>
    </div>
  )
}

export default AddProduct