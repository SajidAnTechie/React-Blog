import React from "react";
import {
  makeStyles,
  Toolbar,
  Button,
  Typography,
  Link,
  Container,
} from "@material-ui/core/";
import { Link as RouterLink } from "react-router-dom";
import { NavLInkWrapper } from "./style";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: "0px",
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    overflowX: "auto",
    justifyContent: "center",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Navbar = () => {
  const token = useSelector((state) => state.token !== null);
  const classes = useStyles();
  const Navlinks = [
    { name: "Home", path: "/" },
    { name: "ABout", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  let authInfo = (
    <React.Fragment>
      <Button
        component={RouterLink}
        to="/login"
        variant="outlined"
        size="small"
        color="inherit"
      >
        Login
      </Button>

      <Button
        component={RouterLink}
        to="/register"
        variant="outlined"
        size="small"
        color="inherit"
      >
        Sign up
      </Button>
    </React.Fragment>
  );

  if (token) {
    authInfo = (
      <React.Fragment>
        <Button
          component={RouterLink}
          to="/logout"
          variant="outlined"
          size="small"
          color="inherit"
        >
          Logout
        </Button>
        <Button
          component={RouterLink}
          to="/dashBoared"
          variant="outlined"
          size="small"
          color="inherit"
        >
          DashBoared
        </Button>
      </React.Fragment>
    );
  }

  return (
    <NavLInkWrapper>
      <Container maxWidth="md">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Blog
          </Typography>
          {authInfo}
        </Toolbar>

        <Toolbar
          component="nav"
          variant="dense"
          className={classes.toolbarSecondary}
        >
          {Navlinks.map((navLink, index) => {
            return (
              <Link
                color="inherit"
                noWrap
                variant="body2"
                key={index}
                component={RouterLink}
                to={navLink.path}
                className={classes.toolbarLink}
              >
                {navLink.name}
              </Link>
            );
          })}
        </Toolbar>
      </Container>
    </NavLInkWrapper>
  );
};

export default Navbar;
