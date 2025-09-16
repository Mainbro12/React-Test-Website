import * as dotenv from "dotenv";

dotenv.config();

const APP_CONFIG = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  IMAGES_FOLDER_NAME: process.env.IMAGES_FOLDER_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  SERVER_PORT: process.env.SERVER_PORT,
};

export default APP_CONFIG;
