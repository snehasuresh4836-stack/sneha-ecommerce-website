import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios';

const ViewProduct = () => {
     const [product, setProduct] = useState([]);
    
        useEffect(() => {
          products();
        }, [])
    
        const products = async () => {
        try {
          const res = await axios.get('http://localhost:3005/view/product')
          setProduct(res.data);
        } catch (err) {
          console.error('Error fetching cart items:', err)
        }
      }
        const delValue=(id)=>{
        axios.delete("http://localhost:3005/remove/product/"+ id)
        .then((res)=>{
            alert(res.data)
            window.location.reload()
        })
    }
  return (
    <div>
      <AdminNavbar/>
        <div className='product'>
        <div className="products-items">
          <div className="product-titles">
            <p>Image</p>
            <p>Product Name</p>
            <p>Description</p>
            <p>Price</p>
            <p>Remove</p>
          </div>
          <br/>
          <hr />
          {product.map((val)=>{
                    return(
                      <div key={val._id}>
                      <div   className='product-titles product-items'>
                         <img src={val.image} alt=''/>
                         <p>{val.productname}</p>
                         <p>{val.description}</p>
                         <p>{val.price}</p>
                         <p className='cross'onClick={()=>{delValue(val._id)}}>X</p> 
                      </div>
                      <hr />
                      </div>
                      )
                    })}
        </div>    
    </div>
        
    </div>
  )
}

export default ViewProduct
