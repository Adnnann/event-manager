/* eslint-disable no-underscore-dangle */
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import User from "../models/user.model.js";
import config from "../config/config.js";
import Course from "../models/events.model.js";

const signin = async (req, res) => {
  const courseNum = await Course.find({}).exec();

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.send({ error: "User not found" });
    }
    if (!user.authenticate(req.body.password)) {
      return res.send({ error: "Email and password do not match" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      config.secret
    );
    res.cookie("userJwtToken", token, {
      expire: new Date() + 999,
      httpOnly: true,
    });

    return res.send({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        userImage: user.userImage,
        enrolledInCourses: user.enrolledInCourses,
        completedCourses: user.completedCourses,
      },
      courseNum: user.role !== "student" ? courseNum.length : null,
    });
  });
};

const signout = (req, res) => {
  res.clearCookie("userJwtToken");
  res.send({ message: "User signed out" });
};

const requireSignin = expressJwt({
  secret: config.secret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const isSignedUser = (req, res, next) => {
  if (!req.cookies.userJwtToken) {
    return res.send({ error: "User not signed" });
  }
  next();
};

export default {
  signin,
  signout,
  isSignedUser,
};
