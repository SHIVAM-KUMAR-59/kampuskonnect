import Event from "../../models/event.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";

const fetchEventById = async (eventId) => {
  try {
    const event = await Event.findById(eventId).populate("createdBy");
    if (!event) {
      throw new ApiError(404, "Event not found");
    }
    return event;
  } catch (err) {
    handleServerError(err);
  }
};

export default fetchEventById;
