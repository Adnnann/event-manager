/* eslint-disable no-console */
import mongoose from "mongoose";
import config from "./config/config";
import app from "./app";
import { Server } from "socket.io";

let onlineUsers = [];

const io = new Server({
  cors: {
    origin: "*",
  },
});

const addNewUser = async (userData, socketId) => {
  const user = userData;
  const userSocketId = await socketId;
  

  if (
    !onlineUsers.some((item) => item.id === user.id) &&
    typeof user === "object"
  ) {
    user["socketId"] = userSocketId;
    onlineUsers.push({ ...user });
  }

};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (id) => {
  return onlineUsers.filter((user) => user.id === id);
 
};

io.on("connection", (socket) => {
  socket.on("newUser", (user) => {
    addNewUser(user, socket.id);
  });

  socket.on("getUserData", (id) => {
    getUser(id);
  });

  socket.on("sendNotification", ({ senderId, receiverId }) => {
   
    const receiver = getUser(receiverId);
    const sender = getUser(senderId)
    io.to(receiver[0].socketId).emit("getNotification", sender[0]);
})
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

const server = app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`Server started at port ${config.port}`);
});

io.listen(server);

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((e) => console.log(e));
