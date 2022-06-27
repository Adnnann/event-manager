import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoggedUserData } from "./features/eLearningSlice";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/core/Header";
import LoginOrSignup from "./components/user/LoginOrSignup";
import AllUsers from "./components/admin/AllUsers";
import AllCourses from "./components/admin/AllCourses";
import EditCourse from "./components/courses/EditCourse";
import EditProfile from "./components/user/EditUserProfile";
import Courses from "./components/courses/Courses";
import CreateUser from "./components/user/CreateUser";
import UnathorizedUser from "./components/utils/UnathorizedUser";
import LoggedOutUser from "./components/user/LoggedOutUser";
import AddEvent from "./components/courses/AddEvent";

function MainRouter() {
  const loggedUser = useSelector(getLoggedUserData);
  return (
    <Router>
      {loggedUser?.user ? <Header /> : null}

      <Routes>
        <Route path="/" element={<LoginOrSignup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/createEvent" element={<AddEvent />}></Route>
        <Route path="/admin/courses" element={<AllCourses />}></Route>
        <Route path="/editCourse" element={<EditCourse />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/admin/createUser" element={<CreateUser />}></Route>
        <Route path="/unathorizedUser" element={<UnathorizedUser />}></Route>
        <Route path="/loggedoutUser" element={<LoggedOutUser />}></Route>
      </Routes>
    </Router>
  );
}

export default MainRouter;
