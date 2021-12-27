import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../state/authenticationSlice";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import { Card, CardMedia } from "@mui/material";
import img from "./shop_name.png";

export default function Nav() {
  const history = useHistory();
  const handleRedirect = (event) => {
    const route = event.target.innerText.toLowerCase();
    history.push("/" + route);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    if (cart.length === 0) return;
    setAnchorEl(event.currentTarget);
  };

  const { isLoading, user } = useSelector((state) => state.authentication);
  const { cart } = useSelector((state) => state.products);
  const { isLoading: panelLoading } = useSelector((state) => state.panel);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    history.push("/home");
  };

  const menuId = "primary-search-account-menu";
  const navStyles = {
    backgroundColor: "white",
    height: "70px",
    boxShadow: "none",
  };

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={navStyles}>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "10px",
                marginRight: "25px",
              }}
            >
              {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                E-shop
              </Typography> */}

              <Button
                sx={{
                  color: "black",
                  fontFamily: "Pushster",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                onClick={handleRedirect}
              >
                Home
              </Button>
              <IconButton
                size="large"
                edge="center"
                aria-label="account of current user"
                aria-controls={menuId}
                // aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{ color: "black" }}
              >
                <ShoppingCartTwoToneIcon />
                <Badge
                  badgeContent={cart.length}
                  color="error"
                  sx={{ width: "2px", height: "2px" }}
                ></Badge>
              </IconButton>

              <Button
                sx={{
                  color: "black",
                  fontFamily: "Pushster",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                onClick={!!!user ? handleRedirect : handleLogout}
              >
                {!!user ? "Log out" : "Authenticate"}
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        {(isLoading || panelLoading) && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Menu
          onClick={() => history.push("/Card")}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {cart.map((item) => (
            <MenuItem key={item.id}>{item.name}</MenuItem>
          ))}
        </Menu>
      </div>
      <div>
        <Card
          elevation={4}
          sx={{
            height: "100px",
            width: "200px",
            marginLeft: "45%",
          }}
        >
          <CardMedia
            component="img"
            height="100px"
            width="200px"
            marginBottom="10px"
            fullWidth={true}
            image={img}
            alt="Shop Logo"
          />
        </Card>
      </div>
    </>
  );
}
