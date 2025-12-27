import Chat from "../../models/chat.schema.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { mapChat } from "../../utils/mapResult.util.js";

const createChatService = async (currentUserId, currentUserRole, targetUserId, targetUserRole) => {
  try {
    // Validate roles
    const validRoles = ["STUDENT", "ALUMNI"];

    if (!validRoles.includes(currentUserRole)) {
      throw new ApiError(400, "Invalid current user role");
    }

    if (!validRoles.includes(targetUserRole)) {
      throw new ApiError(400, "Invalid target user role");
    }

    // Enforce STUDENT ↔ ALUMNI rule
    if (currentUserRole === targetUserRole) {
      throw new ApiError(400, "Chats are allowed only between Student and Alumni");
    }

    // Prevent self chat (extra safety)
    if (currentUserId.toString() === targetUserId.toString()) {
      throw new ApiError(400, "Cannot create chat with yourself");
    }

    // Assign correct IDs
    const studentId = currentUserRole === "STUDENT" ? currentUserId : targetUserId;

    const alumniId = currentUserRole === "ALUMNI" ? currentUserId : targetUserId;

    // Check if chat already exists
    let chat = await Chat.findOne({
      student: studentId,
      alumni: alumniId,
    })
      .populate("student", "-password")
      .populate("alumni", "-password")
      .populate("lastMessage");

    console.log("chat", chat)
    if (chat) {
      return mapChat(chat);
    }

    // Create new chat
    const createdChat = await Chat.create({
      student: studentId,
      alumni: alumniId,
    });

    // Populate before returning
    const populatedChat = await Chat.findById(createdChat._id)
      .populate("student", "-password")
      .populate("alumni", "-password");

    console.log("populatedChat", populatedChat)
    return mapChat(populatedChat);
  } catch (err) {
    console.log(err)
    handleServerError(err);
  }
};

export default createChatService;
