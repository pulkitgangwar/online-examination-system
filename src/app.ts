import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authenticate } from "./middlewares/authenticate";
// routes
import AuthRoutes from "./routes/auth";
import RootRoutes from "./routes/root";
import DashboardRoutes from "./routes/dashboard";
import { authorizeUser } from "./middlewares/authorizeUser";

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

// routes
app.use("/auth", AuthRoutes);
app.use("/", authenticate, RootRoutes);
app.use("/dashboard", authenticate, authorizeUser, DashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
});
