import fetchAllChatsService from "../../services/chat/fetch.service.js";

const fetchAllChatsController = async (req, res, next) => {
  try {
    const chats = await fetchAllChatsService(req.user);
    return res.status(200).json({ success: true, message: "Chats fetched successfully", chats });
  } catch (err) {
    next(err);
  }
};

export default fetchAllChatsController;
