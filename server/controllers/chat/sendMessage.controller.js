import sendMessageService from "../../services/chat/sendMessage.service.js";
import { isValidObjectId } from "../../utils/common.util.js";

const sendMessageController = async (req, res, next) => {
  try {
    const { chatId, content } = req.body;
    const user = req.user;

    if (!chatId || !content || content.trim() === "") {
      return res.status(400).json({ message: "chatId and content are required" });
    }

    if (!isValidObjectId(chatId)) {
      return res.status(400).json({ message: "Invalid Chat ID format" });
    }

    await sendMessageService(user, chatId, content);
    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    next(err);
  }
};

export default sendMessageController;