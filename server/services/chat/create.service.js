import Chat from "../../models/chat.schema.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";

const createChatService = async (currentUserId, currentUserRole, targetUserId, targetUserRole) => {
  try {
    if (currentUserRole !== "STUDENT" && currentUserRole !== "ALUMNI") {
      throw new ApiError("Invalid current user role");
    }

    if (targetUserRole !== "STUDENT" && targetUserRole !== "ALUMNI") {
      throw new ApiError("Invalid target user role");
    }

    // Prevent self-chat
    if (
      currentUserId.toString() === targetUserId.toString() &&
      currentUserRole === targetUserRole
    ) {
      throw new ApiError("Cannot create chat with yourself");
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      participants: {
        $all: [
          { $elemMatch: { userId: currentUserId, role: currentUserRole } },
          { $elemMatch: { userId: targetUserId, role: targetUserRole } },
        ],
      },
    }).populate("lastMessage");

    if (chat) {
      return chat;
    }

    // Create new chat
    const chatData = {
      participants: [
        { userId: currentUserId, role: currentUserRole },
        { userId: targetUserId, role: targetUserRole },
      ],
    };

    const createdChat = await Chat.create(chatData);
    return createdChat;
  } catch (err) {
    handleServerError(err);
  }
};

export default createChatService;
