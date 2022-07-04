import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  getCloseAccountFormStatus,
  getEditUserFormStatus,
  getEditUserPasswordFormStatus,
  getEvents,
  getFilter,
  getLoggedUserData,
  getUserToken,
} from "../../features/eventsSlice";
import { useMediaQuery, Grid } from "@mui/material";

import DashboardRightPanel from "./DashboardRightPanel";
import { makeStyles } from "@mui/styles";
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

const Dashboard = ({ socket }) => {
  const loggedUser = useSelector(getLoggedUserData);
  useEffect(() => {
    loggedUser?.user && socket?.emit("getUserData", loggedUser.user._id);
  }, []);

  return <DashboardRightPanel socket={socket} />;
};

export default Dashboard;
