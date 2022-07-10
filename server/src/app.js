import express from "express";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userImageRoutes from "./routes/userImage.routes.js";
import eventRoutes from "./routes/events.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(cors());
app.use(helmet());
//app.use(passport.initialize());
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", eventRoutes);

app.use("/images", express.static("images"));
app.use("/", userImageRoutes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: `${err.name} : ${err.message}` });
  }
});

export default app;
