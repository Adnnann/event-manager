/* eslint-disable no-underscore-dangle */
import mongoose from "mongoose";
import _ from "lodash";
import Users from "./src/models/user.model.js";
import Events from "./src/models/events.model.js";
import config from "./src/config/config.js";

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

const events = [];
const categories = ["courses", "meetups"];

const createEvents = async () => {
  await Users.insertMany(users);
  const user = await Users.where({}).exec();
  for (let i = 0; i < 100; i++) {
    events.push({
      title: `Event ${i}`,
      eventImage:
        "https://media-exp1.licdn.com/dms/image/C561BAQE-51J-8KkMZg/company-background_10000/0/1548357920228?e=2147483647&v=beta&t=wrOVYN8qrGon9jILrMQv78FsyOV4IMQxr_3UjYtUREI",
      description: `Event ${i} description`,
      category: categories[Math.floor(Math.random() * categories.length)],
      date: new Date(),
      price: Math.floor(Math.random() * 100),
      createdBy: user[Math.floor(Math.random() * user.length)]._id,
      participants: [],
    });
  }
  await Events.insertMany(events);
};

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((e) => console.log(e));

createEvents()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
