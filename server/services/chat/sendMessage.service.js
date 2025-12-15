import Chat from "../../models/chat.schema.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import Message from "../../models/message.model.js";

const sendMessageService = async (user, chatId, content) => {
  try {
    const chat = await Chat.findById(chatId).populate("student").populate("alumni");
    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }

    if (chat.student._id.toString() !== user.id && chat.alumni._id.toString() !== user.id) {
      throw new ApiError(403, "You cannot access this chat");
    }

    const newMessage = new Message({
      chatId,
      sender: user.id,
      content,
    });

    chat.lastMessage = newMessage._id;
    await chat.save();
    await newMessage.save();

    return true;
  } catch (err) {
    console.error("Error in sendMessageService:", err);
    handleServerError(err);
  }
};

export default sendMessageService;
