import deleteMessageService from "../../services/chat/deleteMessage.service.js";
import { isValidObjectId } from "../../utils/common.util.js";

const deleteMessageController = async (req, res, next) => {
  try {
    const { id: messageId } = req.params;
    const user = req.user;

    if (!messageId) {
      return res.status(400).json({ message: "Message ID is required" });
    }

    if (!isValidObjectId(messageId)) {
      return res.status(400).json({ message: "Invalid message ID format" });
    }
    await deleteMessageService(messageId, user);
    return res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export default deleteMessageController;
