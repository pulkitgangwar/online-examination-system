import session from "express-session";
import CreateSequelizeStore from "connect-session-sequelize";
import { sequelize } from "./database.js";

const SequelizeStore = CreateSequelizeStore(session.Store);

const sessionStore = new SequelizeStore({
  db: sequelize,
});

export default sessionStore;
