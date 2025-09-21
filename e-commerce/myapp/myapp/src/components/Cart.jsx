
import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    if (!userId) {
      alert("Please login first!");
      navigate('/login');
      return;
    }

          const res = await axios.get(`http://localhost:3005/view/cart/${userId}`);
    if (res.data.success) {
      setCart(Array.isArray(res.data.cart) ? res.data.cart : []);
    } else {
      setCart([]);
    }
  } catch (err) {
    console.error("Error fetching cart items:", err);
    setCart([])
  }
};
const delValue = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    if (!userId) {
      alert("Please login first!");
      navigate('/login');
      return;
    }

    const res = await axios.delete(
      `http://localhost:3005/remove/cart/${userId}/${productId}`
    );

    if (res.data.success) {
      alert(res.data.message);
      setCart(Array.isArray(res.data.cart) ? res.data.cart : []);
    } else {
      alert("Something went wrong while removing the item.");
    }
  } catch (err) {
    console.error("Error deleting cart item:", err);
  }
};

      const grandTotal = cart.reduce((total, val) => {
    if (!val.product) return total;
    return total + val.product.price * val.quantity;
      }, 0)

  return (
    <div>
      <NavBar/>
      <Grid container spacing={2} sx={{ marginTop: 8, padding: 2 }}>
        {!Array.isArray(cart) || cart.length === 0 ? (
          <Typography variant="h6" sx={{ margin: 2 }}>
            Your cart is empty 🛒
          </Typography>
        ) : (
          cart
          .filter((val) => val.product !== null)
             .map((val) => (
            <Grid key={val.product._id}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={val.product.image}
                  title="Cart page"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {val.product.productname}
                  </Typography>
                  <Typography>{val.product.description}</Typography>
                  <Typography sx={{ fontWeight: 600, color: 'green' }}>Quantity: {val.quantity}</Typography>
                  <Typography sx={{ fontWeight: 600, color: 'red' }}>
                    Total Price: ₹{val.product.price * val.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="error"
                    size="large"
                    onClick={() => delValue(val.product._id)}
                  >
                    DELETE
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
          ))
          
        )}<hr/>
         <Grid sx={{ textAlign: 'right', marginTop: 4, marginRight: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Grand Total: ₹{grandTotal}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/payment')}
              >
                Proceed to Checkout
              </Button>
            </Grid>
          
      </Grid>
    </div>
  );
};

export default Cart;