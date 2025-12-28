import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import routes from "./routes/api.route.js";
import { PORT } from "./config/init.config.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
