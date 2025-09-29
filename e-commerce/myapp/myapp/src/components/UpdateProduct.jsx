import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';

const UpdateProduct = () => {
     const [products, setProducts] = useState([]);
      const [selectedProductId, setSelectedProductId] = useState('');
      const [product, setProduct] = useState({
        productname: '',
        description: '',
        price: '',
        image: ''
      });
    
      // Fetch all products
      useEffect(() => {
        axios.get('http://localhost:3005/view/product')
          .then(res => setProducts(res.data))
          .catch(err => console.error('Error fetching products:', err));
      }, []);
    
      // Fetch data of selected product
      useEffect(() => {
        if (selectedProductId) {
          const selected = products.find(p => p._id === selectedProductId);
          if (selected) {
            setProduct({
              productname: selected.productname,
              description: selected.description,
              price: selected.price,
              image: selected.image
            });
          }
        }
      }, [selectedProductId, products]);
    
      const inputHandler = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
      };
    
      const updateHandler = () => {
        if (!selectedProductId) {
          alert('Please select a product to update');
          return;
        }
    
        axios.put(`http://localhost:3005/update/product/${selectedProductId}`, product)
          .then(res => {
            alert('Product updated successfully!');
            window.location.reload();
          })
          .catch(err => {
            console.error('Update error:', err);
            alert('Error updating product.');
          });
      };
    
    return (
    <div>
             <AdminNavbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* Header Bar */}
          <Box
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <EditIcon />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Update Product
            </Typography>
          </Box>

          {/* Form Content */}
          <Box sx={{ p: 4 }}>
            {/* Select Product */}
            <TextField
              select
              fullWidth
              label="Select Product"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              sx={{ mb: 3 }}
            >
              {products.map((p) => (
                <MenuItem key={p._id} value={p._id}>
                  {p.productname}
                </MenuItem>
              ))}
            </TextField>

            {/* Product Name */}
            <TextField
              fullWidth
              label="Product Name"
              name="productname"
              value={product.productname}
              onChange={inputHandler}
              sx={{ mb: 2 }}
            />

            {/* Description */}
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={product.description}
              onChange={inputHandler}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />

            {/* Price */}
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={product.price}
              onChange={inputHandler}
              type="number"
              sx={{ mb: 2 }}
            />

            {/* Image Link */}
            <TextField
              fullWidth
              label="Image Link"
              name="image"
              value={product.image}
              onChange={inputHandler}
              sx={{ mb: 4 }}
            />

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={updateHandler}
                sx={{
                  py: 1.2,
                  fontWeight: "bold",
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.4)",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                ✅ Update
              </Button>

              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => window.history.back()}
                sx={{
                  py: 1.2,
                  fontWeight: "bold",
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                ❌ Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

    </div>
  )
}

export default UpdateProduct