import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME || "1h";

export { DB_URL, PORT, JWT_SECRET, JWT_EXPIRE_TIME };
