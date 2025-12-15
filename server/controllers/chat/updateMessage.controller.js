import updateMessageService from "../../services/chat/updateMessage.service.js";
import { isValidObjectId } from "../../utils/common.util.js";

const updateMessageController = async (req, res, next) => {
  try {
    const { messageId, newContent } = req.body;
    const user = req.user;

    if (!messageId || !newContent || newContent.trim() === "") {
      return res.status(400).json({ message: "messageId and newContent are required" });
    }

    if (!isValidObjectId(messageId)) {
      return res.status(400).json({ message: "Invalid message ID format" });
    }

    await updateMessageService(user, messageId, newContent);
    return res.status(200).json({ success: true, message: "Message updated successfully" });
  } catch (err) {
    next(err);
  }
};

export default updateMessageController;
