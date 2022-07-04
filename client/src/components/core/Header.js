import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, ButtonGroup, Button } from "@mui/material";
import eventManagerAppLogo from "../../assets/eventManagerImg.jpeg";
import { makeStyles } from "@mui/styles";
import DropdownButtons from "../utils/DropdownButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@mui/material";
import theme from "../../theme";
import {
  resetStore,
  setFilter,
  signinUser,
  signoutUser,
} from "../../features/eventsSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 220,
    marginTop: "20px !important",
    margin: "0 auto",
    borderRadius: "50%",
    [theme.breakpoints.only("xs")]: {
      margin: "0 auto",
    },
  },
  headerContainer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const openFilters = Boolean(anchorElFilter);

  const [anchorElUserNavigation, setAnchorElUserNavigation] = useState(null);
  const openUserNavigation = Boolean(anchorElUserNavigation);
  const smallScreen = useMediaQuery(theme.breakpoints.only("xs"));

  const navigate = useNavigate();

  const redirectToDashboard = () => {
    window.location.pathname !== "/" && navigate("/dashboard");
    setAnchorElUserNavigation(null);
  };

  const redirectToCreateEvent = () => {
    window.location.pathname !== "/createEvent" && navigate("/createEvent");
    setAnchorElUserNavigation(null);
  };

  const redirectToMyRegistration = () => {};
  const logout = () => {
    dispatch(signoutUser());
    dispatch(resetStore());
    navigate("/");
  };

  const filterItems = ["All Events", "My Events", "Courses", "Meetups"];
  const userNavigationItems = [
    "Create Event",
    "Dashboard",
    "My Registration",
    smallScreen ? "Logout" : null,
  ];
  const clickEvents = [
    redirectToCreateEvent,
    redirectToDashboard,
    redirectToMyRegistration,
    smallScreen ? logout : null,
  ];

  const filterMeetups = () => {
    dispatch(setFilter("meetups"));
  };

  const clickEventsFilters = [
    redirectToCreateEvent,
    redirectToDashboard,
    redirectToMyRegistration,
    filterMeetups,
  ];

  const handleClickFilter = (event) => {
    setCaretPositionDown(!caretPositionDown);
    setAnchorElFilter(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setCaretPositionDown(true);
    setAnchorElFilter(null);
  };

  const handleClickUserNavigation = (event) => {
    setCaretPositionDown(!caretPositionDown);
    setAnchorElUserNavigation(event.currentTarget);
  };
  const handleCloseUserNavigation = () => {
    setCaretPositionDown(true);
    setAnchorElUserNavigation(null);
  };

  const [caretPositionDown, setCaretPositionDown] = React.useState(true);

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
      <Toolbar>
        <div>
          <DropdownButtons
            items={filterItems}
            clickEvents={clickEventsFilters}
            anchorEl={anchorElFilter}
            setAnchorEl={setAnchorElFilter}
            handleClick={handleClickFilter}
            open={openFilters}
            icon={
              <FontAwesomeIcon
                icon={caretPositionDown ? faCaretDown : faCaretUp}
              />
            }
            handleClose={handleCloseFilter}
            buttonText={"Filter"}
          />
        </div>
        <DropdownButtons
          items={userNavigationItems}
          clickEvents={handleClickUserNavigation}
          anchorEl={anchorElUserNavigation}
          setAnchorEl={setAnchorElUserNavigation}
          handleClick={handleClickUserNavigation}
          open={openUserNavigation}
          startIcon={
            smallScreen ? (
              <FontAwesomeIcon icon={faBars} style={{ fontSize: "30px" }} />
            ) : null
          }
          handleClose={handleCloseUserNavigation}
          buttonText={smallScreen ? null : "Dashboard"}
        />
        {smallScreen ? null : (
          <Button
            style={{
              color: "white",
              marginLeft: "10px",
              fontSize: "20px",
              textTransform: "none",
            }}
            variant="text"
            onClick={logout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
