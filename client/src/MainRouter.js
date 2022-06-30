import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoggedUserData } from "./features/eLearningSlice";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/core/Header";
import LoginOrSignup from "./components/user/LoginOrSignup";
import AddEvent from "./components/events/AddEvent";
import UserEvents from "./components/events/UserEvents";

function MainRouter({socket}) {
  const loggedUser = useSelector(getLoggedUserData);
  return (
    <Router>
      {loggedUser?.user ? <Header /> : null}

      <Routes>
        <Route path="/" element={<LoginOrSignup socket={socket}/>}></Route>
        <Route path="/dashboard" element={<Dashboard socket={socket} />}></Route>
        <Route path="/createEvent" element={<AddEvent />}></Route>
        <Route path="/userEvents" element={<UserEvents />}></Route>
      </Routes>
    </Router>
  );
}

export default MainRouter;
