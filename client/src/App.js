import React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import MainRouter from "./MainRouter";
import theme from "./theme";

const App = () => {
  //to enable usage of gitpod
  const socketIOURI = window.location;
  const socketConnetction =
    socketIOURI.protocol === "https:"
      ? "https://5000-adnnann-eventmanager-wp80rlt8auj.ws-eu51.gitpod.io/"
      : "http://localhost:5000";

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io(socketConnetction));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <MainRouter socket={socket} />
    </ThemeProvider>
  );
};

export default App;
