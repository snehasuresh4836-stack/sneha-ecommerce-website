import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {
  const [input, setInput] = useState({ Email: "", Password: "" })
  const navigate = useNavigate()

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    console.log(input)
  }

  const loginHandler = () => {
    axios.post("http://localhost:3005/login", input)
      .then((res) => {
        alert(res.data.message)
        console.log(res.data.message)
       if (res.data.success) {
          localStorage.setItem('user', JSON.stringify({
            email: res.data.email,
            name: res.data.name,
            userType: res.data.userType,
            userId: res.data.userId
          }));
          
          if (res.data.userType === "admin") {
            navigate("/viewproduct");
          } else {
            navigate("/home");
          }
        }
      })
  
      .catch((err) => {
        console.log("Login error:", err)
        alert("An error occurred during login")
      })
  }

  return (
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
          maxWidth: 400,
          width: "100%",
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", textAlign: "left" }}
        >
          Login
        </Typography>

        <form >
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="Email"
            size="small"
            value={input.Email}
            onChange={inputHandler}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            size="small"
            name="Password"
            value={input.Password}
            onChange={inputHandler}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#febd69",
              color: "black",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#f3a847" },
              mb: 2,
            }}
            onClick={loginHandler}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" sx={{ mb: 2, textAlign: "left" }}>
          By continuing, you agree to Jass community{" "}
          <Link to="#">Conditions of Use</Link> and{" "}
          <Link to="#">Privacy Notice</Link>.
        </Typography>

        <Box sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            New to JASS?
          </Typography>
        </Box>

        <Link to="/">
          <Button
            fullWidth
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "#d5d9d9",
              color: "black",
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#f7fafa" },
            }}
          >
            Create your jass account!
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};

export default Login;
