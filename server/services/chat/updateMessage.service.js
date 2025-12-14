import { ApiError, handleServerError } from "../../utils/error.util.js";
import Message from "../../models/message.model.js";

const updateMessageService = async (user, messageId, newContent) => {
  try {
    const message = await Message.findById(messageId);
    if (!message || message.isDeleted) {
      throw new ApiError(404, "Message not found");
    }

    if (message.sender.toString() !== user.id) {
      throw new ApiError(403, "You cannot update this message");
    }
    message.content = newContent;
    message.edited = true;
    await message.save();

    return true;
  } catch (err) {
    handleServerError(err);
  }
};

export default updateMessageService;
