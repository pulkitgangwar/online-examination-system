import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authenticate } from "./middlewares/authenticate";
import { engine } from "express-handlebars";
import http from "http";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";
// routes
import AuthRoutes from "./routes/auth";
import RootRoutes from "./routes/root";
import DashboardRoutes from "./routes/dashboard";
import UserRoutes from "./routes/user";
import QuizRoutes from "./routes/quiz";
import { authorizeUser } from "./middlewares/authorizeUser";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { allowEIO3: true });
const peerServer = ExpressPeerServer(server, { path: "/video" });

app.use("/peer", peerServer);

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
    helpers: {
      json: (ctx: any) => JSON.stringify(ctx),
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("home");
});
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "/views"));
// app.set("view options", {
//   layout: "layouts/main",
// });
// hbs.registerHelper("json", (ctx) => JSON.stringify(ctx));
// const partialsDir = path.join(__dirname, "/views/partials");
// const filenames = readdirSync(partialsDir);
// filenames.forEach(function (filename) {
//   const matches = /^([^.]+).hbs$/.exec(filename);
//   if (!matches) {
//     return;
//   }
//   const name = matches[1];
//   const template = readFileSync(partialsDir + "/" + filename, "utf8");
//   hbs.registerPartial(name, template);
// });

// morgan config
app.use(morgan("dev"));

// routes
app.use("/auth", AuthRoutes);
app.use("/home", authenticate, RootRoutes);
app.use("/dashboard", authenticate, authorizeUser, DashboardRoutes);
app.use("/users", authenticate, authorizeUser, UserRoutes);
app.use("/quiz", authenticate, authorizeUser, QuizRoutes);

io.on("connection", (socket) => {
  // When someone attempts to join the room
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId); // Join the room
    socket.broadcast.emit("user-connected", userId); // Tell everyone that we joined

    // Communicate the disconnection
    socket.on("disconnect", () => {
      socket.broadcast.emit("user-disconnected", userId);
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
});
