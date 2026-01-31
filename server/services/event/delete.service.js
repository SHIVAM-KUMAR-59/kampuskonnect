import Event from "../../models/event.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";

const deleteEventService = async (id) => {
  try {
    const event = await Event.findById(id);
    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    await event.deleteOne();
    return true;
  } catch (err) {
    handleServerError(err);
  }
};

export default deleteEventService;
