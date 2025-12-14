import createChatService from "../../services/chat/create.service.js";
import { isValidObjectId } from "../../utils/common.util.js";

const createChatController = async (req, res, next) => {
  try {
    const { targetUserId, targetUserRole } = req.body;
    const currentUserId = req.user.id;
    const currentUserRole = req.user.role;

    if (!isValidObjectId(targetUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const chat = await createChatService(
      currentUserId,
      currentUserRole,
      targetUserId,
      targetUserRole
    );

    res.status(201).json({
      success: true,
      message: "Chat created successfully",
      chat,
    });
  } catch (err) {
    next(err);
  }
};

export default createChatController;
