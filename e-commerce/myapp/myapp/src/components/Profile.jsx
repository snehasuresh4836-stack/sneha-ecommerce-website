import React from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  Grid
} from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";


const Profile = ({ onSignOut }) => {
  const token = localStorage.getItem("token")
  console.log("Token in Profile:", token)


  return (
    <div><NavBar/>
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f2f2f2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: 4,
          borderRadius: 2,
        }}
      >
        
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            alt={ token?.name || "User"}
            src={""}
            sx={{ width: 80, height: 80, mr: 2, bgcolor: "#febd69", fontSize: 30 }}
          >
            {token?.name ? token.name[0].toUpperCase() : "U"}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {token?.email || "guest@example.com"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, bgcolor: "#fff8f0" }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Your Orders
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track, return, or buy things again
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, bgcolor: "#fff8f0" }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Your Addresses
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Edit or add addresses for orders
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, bgcolor: "#fff8f0" }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Payment Options
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your saved cards & UPI
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, bgcolor: "#fff8f0" }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Account Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Change email, password, or mobile
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        
        <Box sx={{ textAlign: "center" }}>
          <Link to="/login">
          <Button
            variant="contained"
            onClick={onSignOut}
            sx={{
              bgcolor: "#febd69",
              color: "black",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#f3a847" },
            }}
          >
            Sign Out
          </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  </div>);
};

export default Profile;
