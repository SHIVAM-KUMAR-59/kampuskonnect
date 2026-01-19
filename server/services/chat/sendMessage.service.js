import Chat from "../../models/chat.schema.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import Message from "../../models/message.model.js";
import { mapMessage } from "../../utils/mapResult.util.js";

const sendMessageService = async (sender, chatId, content) => {
  try {
    const chat = await Chat.findById(chatId).populate("student").populate("alumni");
    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }

    if (chat.student._id.toString() !== sender && chat.alumni._id.toString() !== sender) {
      throw new ApiError(403, "You cannot access this chat");
    }

    const newMessage = new Message({
      chatId,
      sender: sender,
      content,
    });

    chat.lastMessage = newMessage._id;
    await chat.save();
    await newMessage.save();

    return mapMessage(newMessage);
  } catch (err) {
    console.error("Error in sendMessageService:", err);
    handleServerError(err);
  }
};

export default sendMessageService;
