const mongoose = require("mongoose");
const Events = require("./src/models/events.model");
const Users = require("./src/models/user.model");
const config = require("./src/config/config");

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((e) => console.log(e));

const deleteSeed = async () => {
  await Users.deleteMany({});
  await Events.deleteMany({});
};

deleteSeed()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
