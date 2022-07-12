/* eslint-disable no-underscore-dangle */
import jwt from "jsonwebtoken";
import _ from "lodash";
import User from "../models/user.model.js";
import errorHandler from "./helpers/dbErrorHandlers.js";
import Course from "../models/events.model.js";
import config from "../config/config.js";

const create = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      res.send({ error: errorHandler.getErrorMessage(err) });
    } else {
      res.send({ message: "Successfuly created a new user." });
    }
  });
};

const reLoginUser = async (req, res) => {
  const courseNum = await Course.find({}).exec();
  User.findOne({ _id: req.profile.id }, (err, user) => {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      config.secret
    );

    return res.send({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  });
};

const read = (req, res) => {
  User.findOne({ _id: req.profile.id }, (err, user) => {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      config.secret
    );

    return res.send({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      message: "User found!",
    });
  });
};

const update = async (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);

  await User.findOneAndUpdate({ _id: req.profile._id }, { ...user }).exec();

  return res.send({
    message: "Data updated",
    data: user,
    token: req.cookies.userJwtToken,
  });
};

const remove = async (req, res, next) => {
  const userProfile = await User.findOne({ _id: req.profile._id });

  if (!userProfile.authenticate(req.body.password)) {
    return res.send({ error: "Incorrect old password" });
  }

  const user = req.profile;
  await User.findOneAndUpdate({ _id: req.profile._id }, { active: "closed" });

  return res.send({ message: "Account deleted" });
};

const updateUserPassword = async (req, res, next) => {
  let user = req.profile;

  user = _.extend(user, req.body);

  const userProfile = await User.findOne({ _id: req.profile._id });

  if (!userProfile.authenticate(req.body.password)) {
    return res.send({ error: "Incorrect old password" });
  }
  user.hashed_password = null;
  user.password = req.body.newPassword;

  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.send({ error: errorHandler.getErrorMessage(err) });
    }
    return res.send({
      message: "Data updated",
      data: user,
    });
  });
};

const getAllUsers = (req, res) => {
  User.find({}).exec((err, user) => {
    if (err) {
      res.send({ err: "error" });
    } else {
      res.send({ users: user });
    }
  });
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found!" });
    }
    req.profile = user;
    next();
  });
};

export default {
  create,
  read,
  update,
  remove,
  updateUserPassword,
  getAllUsers,
  reLoginUser,
  userByID,
};
