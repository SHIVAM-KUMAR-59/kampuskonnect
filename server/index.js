import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import routes from "./routes/api.route.js";
import { PORT } from "./config/init.config.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import sendMessageService from "./services/chat/sendMessage.service.js";
import logger from "./config/logger.config.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://kampuskonnect-kappa.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

io.on("connection", (socket) => {
  // JOIN CHAT ROOM
  socket.on("join-chat", ({ chatId, userId }) => {
    socket.join(chatId);
  });

  // SEND MESSAGE
  socket.on("send-message", async (data) => {
    const { chatId } = data;

    try {
      const message = await sendMessageService(data.sender, data.chatId, data.message);

      // send to everyone in the room EXCEPT sender
      socket.to(chatId).emit("receive-message", message);
    } catch (err) {
      handleServerError(err);
    }
  });

  socket.on("disconnect", () => {
    logger.debug(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  logger.debug(`Server is running on port ${PORT}`);
});
