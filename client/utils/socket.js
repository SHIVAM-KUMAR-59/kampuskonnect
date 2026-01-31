import { io } from "socket.io-client";

// singleton
let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
      reconnection: true,
    });
  }
  return socket;
};
