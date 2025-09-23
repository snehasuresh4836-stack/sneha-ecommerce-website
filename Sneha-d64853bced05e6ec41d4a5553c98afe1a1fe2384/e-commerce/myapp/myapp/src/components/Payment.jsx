import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Payment = ({ onPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onPayment({ paymentMethod, cardNumber, upiId });
  };

  const handleExit = () => {
    navigate("/Home"); 
  };

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
          maxWidth: 500,
          width: "100%",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Payment Options
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{ mb: 3 }}
          >
            <FormControlLabel
              value="card"
              control={<Radio />}
              label="Credit / Debit Card"
            />
            <FormControlLabel value="upi" control={<Radio />} label="UPI" />
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label="Cash on Delivery"
            />
          </RadioGroup>

          {paymentMethod === "card" && (
            <TextField
              fullWidth
              label="Card Number"
              variant="outlined"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          {paymentMethod === "upi" && (
            <TextField
              fullWidth
              label="UPI ID"
              variant="outlined"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          <Button
            type="submit"
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
          >
            Proceed to Pay
          </Button>

         
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleExit}
            sx={{ borderRadius: "8px" }}
          >
            Exit to Home
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Payment;
