
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Button, Card, CardContent, CardMedia, Grid, CardActions, Typography } from '@mui/material'
import axios from "axios";




const Home= () => {
  const [product, setProduct] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchProductItems();
  }, []);

  const fetchProductItems = async () => {
    try {
      const res = await axios.get('http://localhost:3005/view/product');
      setProduct(res.data);
    } catch (err) {
       console.error('Error fetching products:', err);
    }
  };
 

const buyHandler = (val) => {
   navigate("/payment", { state: { product: val } });
  console.log("Buying product:", val);
  
};


  const addHandler = async (val) => {
     navigate("/cart", { state: { product: val } });
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    if (!userId) {
      alert("Please login first!")
      navigate('/login')
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3005/add/cart/${userId}`, {
        productId: val._id,
        quantity: 1,
      })
      alert(res.data.message || "Added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart");
    }
  };

  return (
     <div>
      <NavBar />
      <Grid container spacing={3}>
          {product.map((val) => (
            <Grid item key={val._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  maxWidth: 300,
                  margin: "auto",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "contain" }}
                  image={val.image}
                  title={val.productname}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {val.productname}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {val.description}
                  </Typography>
                  <Typography
                    sx={{ color: "red", fontWeight: 600, mt: 1 }}
                    variant="subtitle1"
                  >
                    PRICE : ₹ {val.price}
                  </Typography>
                </CardContent>

                <CardActions sx={{ display: "flex", gap: 1, p: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => addHandler(val)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => buyHandler(val)}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
    </div>
  );
};

export default Home;