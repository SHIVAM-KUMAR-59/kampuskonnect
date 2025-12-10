import fetchAllEventsService from "../../services/event/fetchAll.service.js";
import { isValidObjectId } from "../../utils/common.util.js";

const fetchEventByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || id.trim() === "") {
      return res.status(400).json({ message: "Event id is required", success: false });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid event id", success: false });
    }

    const event = await fetchAllEventsService(id);
    return res.status(200).json({ event, success: true, message: "Events fetched successfully" });
  } catch (err) {
    next(err);
  }
};

export default fetchEventByIdController;
