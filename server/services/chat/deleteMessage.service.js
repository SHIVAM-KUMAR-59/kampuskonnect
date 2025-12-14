import { ApiError, handleServerError } from "../../utils/error.util.js";
import Message from "../../models/message.model.js";
import Chat from "../../models/chat.schema.js";

const deleteMessageService = async (messageId, user) => {
  try {
    // Fetch message
    const message = await Message.findById(messageId);
    if (!message || message.isDeleted) {
      throw new ApiError(404, "Message not found");
    }

    // Authorization
    if (message.sender.toString() !== user.id && user.role !== "ADMIN") {
      throw new ApiError(403, "You cannot delete this message");
    }

    // Soft delete message
    message.isDeleted = true;
    await message.save();

    // Auto-heal chat.lastMessage if needed
    const chat = await Chat.findById(message.chatId);

    if (chat && chat.lastMessage?.toString() === message._id.toString()) {
      // Find latest non-deleted message
      const latestMessage = await Message.findOne({
        chatId: chat._id,
        isDeleted: false,
      }).sort({ createdAt: -1 });

      chat.lastMessage = latestMessage ? latestMessage._id : null;
      await chat.save();
    }

    return true;
  } catch (err) {
    handleServerError(err);
  }
};

export default deleteMessageService;
