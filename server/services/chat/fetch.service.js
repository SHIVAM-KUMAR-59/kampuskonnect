import Chat from "../../models/chat.schema.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { UserRole } from "../../config/enums.config.js";
import { mapChat } from "../../utils/mapResult.util.js";

const fetchAllChatsService = async (user) => {
  try {
    if (![UserRole.STUDENT, UserRole.ALUMNI].includes(user.role)) {
      throw new ApiError(400, "Invalid user role");
    }

    const query = user.role === UserRole.STUDENT ? { student: user.id } : { alumni: user.id };

    const chats = await Chat.find(query)
      .populate("student", "name profileImage email")
      .populate("alumni", "name profileImage email")
      .populate({
        path: "lastMessage",
        match: { isDeleted: false },
      })
      .sort({ updatedAt: -1 });

    return chats.map((chat) => mapChat(chat));
  } catch (err) {
    handleServerError(err);
  }
};

export default fetchAllChatsService;
