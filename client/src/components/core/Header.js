import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar } from "@mui/material";
import eventManagerAppLogo from "../../assets/eventManagerImg.jpeg";
import { makeStyles } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 220,
    marginTop: "20px !important",
    margin: "0 auto",
    borderRadius: "50%",
    marginBottom: "20px",
    [theme.breakpoints.only("xs")]: {
      margin: "0 auto",
      marginBottom: "20px",
    },
  },
  headerContainer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Header = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const redirectToDashboard = () => {
    window.location.pathname !== "/" && navigate("/dashboard");
  };

  return (
    <AppBar position="static" className={classes.headerContainer}>
      <Toolbar>
        <Box
          component="img"
          className={classes.logo}
          alt="Expense tracker"
          src={eventManagerAppLogo}
          onClick={redirectToDashboard}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
