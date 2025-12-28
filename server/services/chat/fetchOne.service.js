import Chat from "../../models/chat.schema.js";
import Message from "../../models/message.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { mapChat } from "../../utils/mapResult.util.js";

const fetchChatByIdService = async (user, chatId) => {
  try {
    const chat = await Chat.findById(chatId)
      .populate("student")
      .populate("alumni")
      .populate({
        path: "lastMessage",
        match: { isDeleted: false },
      });
    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }

    if (
      chat.student._id.toString() !== user.id &&
      chat.alumni._id.toString() !== user.id &&
      user.role !== "ADMIN"
    ) {
      throw new ApiError(403, "You cannot access this chat");
    }

    const messages = await Message.find({
      chatId,
      isDeleted: false,
    }).populate("sender", "name profileImage email");

    return {chat: mapChat(chat), messages};
  } catch (err) {
    handleServerError(err);
  }
};

export default fetchChatByIdService;
