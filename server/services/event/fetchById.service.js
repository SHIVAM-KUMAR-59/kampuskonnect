import Event from "../../models/event.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { mapEvent } from "../../utils/mapResult.util.js";

const fetchEventByIdService = async (eventId) => {
  try {
    const event = await Event.findById(eventId).populate("createdBy");
    if (!event) {
      throw new ApiError(404, "Event not found");
    }
    return mapEvent(event);
  } catch (err) {
    handleServerError(err);
  }
};

export default fetchEventByIdService;
