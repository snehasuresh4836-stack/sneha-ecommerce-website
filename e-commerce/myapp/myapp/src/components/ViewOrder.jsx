import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";


const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3005/admin/orders");
      if (res.data.success) {
        setOrders(res.data.orders || []);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const updateOrderStatus = async (userId, orderId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:3005/update-order/${userId}/${orderId}`,
        { status: newStatus }
      );
      if (res.data.success) {
        alert("Order status updated");
        fetchAllOrders(); // refresh orders
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div>
        <AdminNavbar/>
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Manage Orders
        </Typography>
        <List>
          {orders.map((order) => (
            <ListItem
              key={order.orderId}
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <ListItemText
                primary={`${order.product?.productname || "Unknown Product"} (x${order.quantity})`}
                secondary={`User: ${order.username} (${order.email}) | Status: ${order.status}`}
              />
              <Box display="flex" gap={2} mt={1}>
                <Select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.userId, order.orderId, e.target.value)
                  }
                  size="small"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Out For Delivery">Out For Delivery</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  onClick={() =>
                    updateOrderStatus(order.userId, order.orderId, "Completed")
                  }
                >
                  Mark Completed
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
    </div>
  );
};
export default ViewOrders ;
