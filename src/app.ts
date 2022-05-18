import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authenticate } from "./middlewares/authenticate";
import { engine } from "express-handlebars";
import { readdirSync, readFileSync } from "fs";
// routes
import AuthRoutes from "./routes/auth";
import RootRoutes from "./routes/root";
import DashboardRoutes from "./routes/dashboard";
import UserRoutes from "./routes/user";
import QuizRoutes from "./routes/quiz";
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
app.use(express.static(path.join(__dirname, "../public")));
app.engine(
  "handlebars",
  engine({
    defaultLayout: "sidebar",
    helpers: {
      json: (ctx: any) => JSON.stringify(ctx),
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// morgan config
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/home");
});
app.use("/auth", AuthRoutes);
app.use("/home", authenticate, RootRoutes);
app.use("/dashboard", authenticate, authorizeUser, DashboardRoutes);
app.use("/users", authenticate, authorizeUser, UserRoutes);
app.use("/quiz", authenticate, authorizeUser, QuizRoutes);
app.use((req, res) => {
  res.status(404).render("404", { layout: "main" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
});
