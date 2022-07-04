import React from "react";
import "./App.css";
import MainRouter from "./MainRouter";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <MainRouter socket={socket} />
    </ThemeProvider>
  );
};

export default App;
