/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const _ = require("lodash");
const Courses = require("./src/models/events.model");
const Users = require("./src/models/user.model");
const config = require("./src/config/config");

const courses = [];
const usersId = [];

const users = [
  {
    firstName: "Mak",
    lastName: "Ovcina",
    email: "mak.ovcina@test.com",
    password: "12345678",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@test.com",
    password: "12345678",
  },
  {
    firstName: "John",
    lastName: "Smith",
    email: "hugo_tutto_cammara@test.com",
    password: "12345678",
  },
  {
    firstName: "Larry",
    lastName: "Bird",
    email: "harry.lattam@test.com",
    password: "12345678",
  },
  {
    firstName: "paragon",
    lastName: "paragon",
    email: "paragon@paragon.ba",
    password: "Paragon202!",
    role: "admin",
    active: true,
  },

  {
    firstName: "Luka",
    lastName: "Ovcina",
    email: "luka.ovcina@test.com",
    password: "12345678",
  },
  {
    firstName: "Marina",
    lastName: "Ovcina",
    email: "marina.ovcina@test.com",
    password: "12345678",
  },
  {
    firstName: "Adnan",
    lastName: "Ovcina",
    email: "adnan.ovcina@test.com",
    password: "12345678",
  },
];

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((e) => console.log(e));

const createUsers = async () => {
  await Users.insertMany(users);
};

createUsers()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
