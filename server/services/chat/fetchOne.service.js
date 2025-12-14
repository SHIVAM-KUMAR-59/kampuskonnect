import Chat from "../../models/chat.schema.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { mapChat } from "../../utils/mapResult.util.js";

const fetchChatByIdService = async (user, chatId) => {
  try {
    const chat = await Chat.findById(chatId).populate("student").populate("alumni");
    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }
    console.log(chat);
    if (
      chat.student._id.toString() !== user.id &&
      chat.alumni._id.toString() !== user.id &&
      user.role !== "ADMIN"
    ) {
      throw new ApiError(403, "You cannot access this chat");
    }

    return mapChat(chat);
  } catch (err) {
    console.log(err);
    handleServerError(err);
  }
};

export default fetchChatByIdService;
