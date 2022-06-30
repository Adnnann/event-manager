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
    setSocket(io("https://3000-adnnann-eventmanager-fncec49negf.ws-eu47.gitpod.io/"));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainRouter socket={socket} />
      </div>
    </ThemeProvider>
  );
};

export default App;
