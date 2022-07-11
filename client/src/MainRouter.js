import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserStatus,
  cleanIsSignedStatus,
  fetchEvents,
  fetchUserData,
  fetchUserEvents,
  getLoggedUserData,
  isSignedUser,
} from "./features/eventsSlice";
import jwtDecode from "jwt-decode";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/core/Header";
import LoginOrSignup from "./components/user/LoginOrSignup";
import AddEvent from "./components/events/AddEvent";
import UserEvents from "./components/events/UserEvents";
import EditEvent from "./components/events/EditEvent";
import UnathorizedUser from "./components/utils/UnathorizedUser";

function MainRouter({ socket }) {
  const loggedUser = useSelector(getLoggedUserData);
  const isSigned = useSelector(checkUserStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      Object.keys(loggedUser).length === 0 &&
      Object.keys(isSigned).length === 0
    ) {
      dispatch(isSignedUser());
    }

    if (
      window.location.pathname !== "/" &&
      isSigned?.error &&
      window.location.pathname !== "/unathorizedUser"
    ) {
      window.location.replace("http://localhost:3000/unathorizedUser");
    }

    if (Object.keys(loggedUser).length === 0 && isSigned?.message) {
      const userId = jwtDecode(isSigned.message);

      dispatch(fetchUserData(userId._id));
      dispatch(fetchEvents());
      dispatch(fetchUserEvents(userId._id));
    }

    if (loggedUser?.user && isSigned.message) {
      const user = {
        id: loggedUser.user._id,
        email: loggedUser.user.email,
        name: loggedUser.user.name,
      };

      socket?.emit("newUser", user);
      dispatch(cleanIsSignedStatus());
    }
  }, [isSigned, loggedUser, socket]);
  return (
    <Router>
      {loggedUser?.user ? <Header /> : null}
      <Routes>
        <Route path="/" element={<LoginOrSignup socket={socket} />}></Route>
        <Route
          path="/dashboard"
          element={<Dashboard socket={socket} />}
        ></Route>
        <Route
          path="/createEvent"
          element={<AddEvent socket={socket} />}
        ></Route>
        <Route
          path="/userEvents"
          element={<UserEvents socket={socket} />}
        ></Route>
        <Route
          path="/editEvent"
          element={<EditEvent socket={socket} />}
        ></Route>
        <Route path="/unathorizedUser" element={<UnathorizedUser />}></Route>
      </Routes>
    </Router>
  );
}

export default MainRouter;
