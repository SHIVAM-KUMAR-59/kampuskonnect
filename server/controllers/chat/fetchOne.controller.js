import fetchChatByIdService from "../../services/chat/fetchOne.service.js";
import { isValidObjectId } from "../../utils/common.util.js";

const fetchChatByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Chat ID is required" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Chat ID format" });
    }

    const chat = await fetchChatByIdService(req.user, id);
    return res.status(200).json({ success: true, message: "Chat fetched successfully", chat });
  } catch (err) {
    next(err);
  }
};

export default fetchChatByIdController;
