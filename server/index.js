import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import routes from "./routes/api.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
