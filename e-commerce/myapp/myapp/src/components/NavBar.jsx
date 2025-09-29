import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  InputBase
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  flexGrow: 1,
  display: "flex",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <AppBar position="static" sx={{ backgroundColor: "#131921" }}>
      <Toolbar>
  <Box sx={{ display:'flex', alignItems:"center"}}>
  <img src="https://dslv9ilpbe7p1.cloudfront.net/aW7AXCKsfjzGip8aJdvb7w_store_banner_image.jpeg"
       alt="logo"
       style={{ width: 50,height:50, marginRight:8, borderRadius:"50%"
       }}
       />
       </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
        >
          
        </Typography>

       
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>

        
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Link to="/home">
          <Button color="inherit" startIcon={<HomeIcon />}>Home</Button>
          </Link>
          <Link to="/Payment">
          <Button color="inherit">PAYMENT</Button>
          </Link>
          <Link to="/profile">
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          </Link>
          <Link to="/cart">
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          </Link>
          <Link to="/login">
          <Button size="small" variant="outlined" color="primary"><LogoutIcon/></Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
