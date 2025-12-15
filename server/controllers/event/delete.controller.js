import deleteEventService from "../../services/event/delete.service.js";
import { isValidObjectId } from "../../utils/common.util.js";

const deleteEventController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() === "") {
      return res.status(400).json({ message: "Event id is required", success: false });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid event id", success: false });
    }

    await deleteEventService(id);
    return res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export default deleteEventController;
