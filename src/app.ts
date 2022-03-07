import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import { connectDB } from "./helpers/connectDB";
import { initializeGoogleStrategy } from "./strategy/google";
import sessionStore from "./config/sessionStore";

// routes
import AuthRoutes from "./routes/auth";
import HomeRoutes from "./routes/home";
import { authenticate } from "./middlewares/authenticate";

const app = express();

// env config
dotenv.config();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookieparser
app.use(cookieParser(process.env.SESSION_SECRET));

// initializing view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

// morgan config
app.use(morgan("dev"));

// express session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      maxAge: 8640000, // 1 day
    },
  })
);

// passport init
app.use(passport.initialize());
app.use(passport.session());
initializeGoogleStrategy();

// routes
app.use("/auth", AuthRoutes);
app.use("/", authenticate, HomeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
  await connectDB();
});
