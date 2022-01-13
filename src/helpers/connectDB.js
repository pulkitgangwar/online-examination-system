import { sequelize } from "../config/database.js";

export const connectDB = async () => {
  try {
    await sequelize.sync();
    console.log("database connected!");
  } catch (err) {
    console.log(err);
    console.log("database connection failed!");
  }
};
