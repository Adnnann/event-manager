/* eslint-disable no-underscore-dangle */
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import User from "../models/user.model.js";
import config from "../config/config.js";

const signin = async (req, res) => {
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
        userImage: user.userImage,
      },
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
