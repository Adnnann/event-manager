import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  cleanFilterTerm,
  cleanReloginStatus,
  cleanStore,
  fetchCourses,
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
    marginTop: "30px",
    textTransform: "none",
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

  const redirectToMyRegistrations = () => {};

  const createEvent = () => {
    navigate("/createEvent");
  };

  const signout = () => {
    dispatch(signoutUser());
    dispatch(setLoggedUserStatus());
    navigate("/");
  };

  const userButtonsAndIcons = {
    clickEvents: [
      redirectToDashboard,
      createEvent,
      redirectToMyRegistrations,
      signout,
    ],
    buttons: ["Dashboard", "Create Event", "My Events", "Logout"],
    icons: [faHouse, faChalkboardUser, faGear, faRightFromBracket],
  };

  const formatUserData = (str) => {
    return (
      str.charAt(0).toUpperCase() + str.substr(1, str.length).toLowerCase()
    );
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faUser}
        className={classes.userIcon}
        color="primary"
      />
      <Typography className={classes.username}>
        {loggedUser?.user
          ? `${formatUserData(loggedUser.user.firstName)} ${formatUserData(
              loggedUser.user.lastName
            )}`
          : null}
      </Typography>

      <ButtonGroupWithIcons
        buttons={userButtonsAndIcons.buttons}
        clickEvents={userButtonsAndIcons.clickEvents}
        icons={userButtonsAndIcons.icons}
      />
    </>
  );
};

export default DashboardLeftPanel;
