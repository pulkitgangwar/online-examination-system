import { sequelize } from "../config/database";

export const connectDB = async () => {
  try {
    await sequelize.sync();
    console.log("database connected!");
  } catch (err) {
    console.log(err);
    console.log("database connection failed!");
  }
};
