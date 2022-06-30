import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  getCloseAccountFormStatus,
  getEditUserFormStatus,
  getEditUserPasswordFormStatus,
  getLoggedUserData,
  getUserToken,
} from "../../features/eLearningSlice";
import { useMediaQuery, Grid } from "@mui/material";

import DashboardLeftPanel from "./DashboardLeftPanel";
import DashboardRightPanel from "./DashboardRightPanel";
import { makeStyles } from "@mui/material";
import { useEffect } from "react";
import { io } from "socket.io-client";
import Events from "../events/Events";

const useStyles = makeStyles((theme) => ({
  largeScreens: {
    marginTop: "20px",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  smallScreens: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  editProfileButtons: {
    marginTop: "40px",
    [theme.breakpoints.only("md")]: {
      marginLeft: "20px",
    },
  },
  dashboardTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    backgroundColor: "lightblue",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  numberOfSelectedCourses: {
    textAlign: "left",
    marginLeft: "10px",
  },
  selectedTerm: {
    fontWeight: "900",
    textDecoration: "underline",
  },
}));

const Dashboard = ({socket}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editUserProfile = useSelector(getEditUserFormStatus);
  const editUserPassword = useSelector(getEditUserPasswordFormStatus);
  const closeAccount = useSelector(getCloseAccountFormStatus);
  const loggedUser = useSelector(getLoggedUserData);
  const token = useSelector(getUserToken);

  const iPadAirScreen = useMediaQuery("(width:820px)");
  const iPadMiniScreen = useMediaQuery("(width:768px)");
  const surfaceDuo = useMediaQuery("(width:912px)");



  useEffect(() => {
    loggedUser?.user && socket?.emit("getUserData", loggedUser.user._id);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} md={3} lg={3} xl={3}>
        <DashboardLeftPanel />
      </Grid>
      <Grid item xs={12} md={9} lg={9} xl={9}>
        <DashboardRightPanel socket={socket} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
