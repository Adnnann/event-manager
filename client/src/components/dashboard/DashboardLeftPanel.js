import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  cleanFilterTerm,
  cleanReloginStatus,
  cleanStore,
  fetchCourses,
  fetchUserEvents,
  fetchUsers,
  getCourses,
  getLoggedUserData,
  getMentorCourses,
  getUsers,
  getUserToken,
  reLoginUser,
  setCloseAccountForm,
  setCloseAccountModal,
  setEditUserPasswordForm,
  setEditUserProfileForm,
  setLoggedUserStatus,
  setLoggedUserToEdit,
  setUserToken,
  signoutUser,
  userToken,
} from "../../features/eLearningSlice";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChalkboardUser,
  faHouse,
  faGear,
  faRightFromBracket,
  faUserGroup,
  faCalendarPlus,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import ButtonGroupWithIcons from "./LeftSidePanelButtons";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  userIcon: {
    fontSize: "48px",
    marginTop: "60px",
    [theme.breakpoints.only("xs")]: {
      marginTop: "10px",
    },
  },
  buttons: {
    fontSize: "24px",
    textTransform: "none",
    color: "black",
    marginTop: "20px !important",
  },
  userInfo: {
    marginTop: "20px",
    color: "blue",
    fontSize: "28px",
  },
}));

const DashboardLeftPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedUser = useSelector(getLoggedUserData);

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  const redirectToMyEvents = () => {
    dispatch(fetchUserEvents(loggedUser.user._id));
    navigate("/userEvents");
  };

  const createEvent = () => {
    navigate("/createEvent");
  };

  const redirectToMyRegisteredEvents = () => {};

  const signout = () => {
    dispatch(signoutUser());
    dispatch(setLoggedUserStatus());
    navigate("/");
  };

  const userButtonsAndIcons = {
    clickEvents: [
      redirectToDashboard,
      createEvent,
      redirectToMyEvents,
      redirectToMyRegisteredEvents,
      signout,
    ],
    buttons: [
      "Dashboard",
      "Create Event",
      "My Events",
      "My registrations",
      "Logout",
    ],
    icons: [
      faHouse,
      faChalkboardUser,
      faGear,
      faCalendarPlus,
      faRightFromBracket,
    ],
  };

  const formatUserData = (str) => {
    return (
      str.charAt(0).toUpperCase() + str.substr(1, str.length).toLowerCase()
    );
  };

  return (
    <>
      <ButtonGroupWithIcons
        buttons={userButtonsAndIcons.buttons}
        clickEvents={userButtonsAndIcons.clickEvents}
        icons={userButtonsAndIcons.icons}
      />
    </>
  );
};

export default DashboardLeftPanel;
