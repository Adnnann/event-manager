import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetStore, setFilter, signoutUser } from "../../features/eventsSlice";
import { Box, AppBar, Toolbar, Button, useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
import theme from "../../theme";
import eventManagerAppLogo from "../../assets/eventManagerImg.jpeg";
import DropdownButtons from "../utils/DropdownButtons";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 220,
    marginTop: "20px !important",
    margin: "0 auto",
    borderRadius: "50%",
    [theme.breakpoints.only("xs")]: {
      margin: "0 auto",
      maxWidth: 150,
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

  const redirectToMyRegistration = () => {
    navigate("/userEvents");
  };
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

  const filterAllEvents = () => {
    dispatch(setFilter("allEvents"));
  };
  const filterUserEvents = () => {
    dispatch(setFilter("myEvents"));
  };
  const filterCourses = () => {
    dispatch(setFilter("courses"));
  };
  const filterMeetups = () => {
    dispatch(setFilter("meetups"));
  };

  const clickEventsFilters = [
    filterAllEvents,
    filterUserEvents,
    filterCourses,
    filterMeetups,
  ];

  const handleClickFilter = (event) => {
    setCaretPositionDownFilter(!caretPositionDownNav);
    setAnchorElFilter(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setCaretPositionDownFilter(true);
    setAnchorElFilter(null);
  };

  const handleClickUserNavigation = (event) => {
    setCaretPositionDownNav(!caretPositionDownNav);
    setAnchorElUserNavigation(event.currentTarget);
  };
  const handleCloseUserNavigation = () => {
    setCaretPositionDownNav(true);
    setAnchorElUserNavigation(null);
  };

  const clickEventUserNav = [
    redirectToCreateEvent,
    redirectToDashboard,
    redirectToMyRegistration,
  ];

  const [caretPositionDownFilter, setCaretPositionDownFilter] = useState(true);
  const [caretPositionDownNav, setCaretPositionDownNav] = useState(true);

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
                icon={caretPositionDownFilter ? faCaretDown : faCaretUp}
              />
            }
            handleClose={handleCloseFilter}
            buttonText={"Filter"}
          />
        </div>
        <DropdownButtons
          clickEvents={clickEventUserNav}
          items={userNavigationItems}
          anchorEl={anchorElUserNavigation}
          setAnchorEl={setAnchorElUserNavigation}
          handleClick={handleClickUserNavigation}
          open={openUserNavigation}
          startIcon={
            smallScreen ? (
              <FontAwesomeIcon icon={faBars} style={{ fontSize: "30px" }} />
            ) : (
              <FontAwesomeIcon
                icon={caretPositionDownNav ? faCaretDown : faCaretUp}
              />
            )
          }
          handleClose={handleCloseUserNavigation}
          buttonText={smallScreen ? null : "User navigation"}
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
