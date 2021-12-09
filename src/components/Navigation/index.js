import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { selectUser } from "../../store/user/selectors";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Badge,
  Tooltip,
  makeStyles,
} from "@material-ui/core";

import MenuIcon from "@mui/icons-material/Menu";
import { Pets, Search, Chat } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navBar: {
    display: "flex",
    alignItems: "center",
  },
  linkStyle: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "white",
  },
}));

const pages = ["Products", "Pricing"];
const settings = [
  { label: "Profile", link: "/myprofile" },
  { label: "Account", link: "/Account" },
  { label: "Logout", link: "/Logout" },
];

export default function Navigation() {
  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.navBar}>
          <Link to={"/"}>
            <Pets />
          </Link>
          <Badge>Home</Badge>
        </div>
        <Typography variant="h6" className={classes.logoLg}>
          Pet Life
        </Typography>
        <div className={classes.navBar}>
          {user.isVet && token ? (
            <div>
              <Link to="/petSearch">
                <Search />
              </Link>
              <Badge>Pet Search</Badge>
            </div>
          ) : (
            <div>
              <Link to="/">
                <Search />
              </Link>
              <Badge>Vet Search</Badge>
            </div>
          )}
        </div>
        <div className={classes.navBar}>
          {token ? (
            <div>
              <Link to="/chat" style={{ textDecoration: "none" }}>
                <Chat />

                <Typography variant="h6">Chats</Typography>
              </Link>
            </div>
          ) : null}
        </div>
        <div>
          {token ? (
            <div className={classes.navBar}>
              <Link to="/myprofile">
                <Avatar alt={user.name} src={user.imageUrl} />
              </Link>
            </div>
          ) : null}

          <Badge>{loginLogoutControls}</Badge>
        </div>
      </Toolbar>

      {/* 
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={"/"}>
            <Pets />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Home
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Pet Life</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* TODO delete */}
      {/* <Typography 
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography> */}
      {/* <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-evenly",
            }}
          >
            <Typography
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Pet Life
            </Typography>
            <Link to="/" className={classes.linkStyle}>
              <Search />
              <Typography
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Pet Life
              </Typography>
            </Link>
            <Link to="/chat" className={classes.linkStyle}>
              <Chat />
              <Typography
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Chats
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.name} src={user.imageUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Link
                    className={classes.linkStyle}
                    to={setting.link}
                    style={{ color: "black" }}
                  >
                    <Typography textAlign="center">{setting.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar> 
      </Container> */}
    </AppBar>
  );
}
