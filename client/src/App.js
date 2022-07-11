import React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import MainRouter from "./MainRouter";
import theme from "./theme";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserStatus,
  getLoggedUserData,
  isSignedUser,
} from "./features/eventsSlice";
import { useNavigate } from "react-router-dom";

const App = () => {
  //to enable usage of gitpod
  const URI = window.location;

  const socketConnection =
    URI === "https:"
      ? "https://5000-adnnann-eventmanager-wp80rlt8auj.ws-eu51.gitpod.io/"
      : "http://localhost:5000";

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(socketConnection));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MainRouter socket={socket} />
    </ThemeProvider>
  );
};

export default App;
