import Event from "../../models/event.model.js";
import { handleServerError } from "../../utils/error.util.js";

const fetchAllEventsService = async () => {
  try {
    const events = await Event.find().populate("createdBy");
    return events;
  } catch (err) {
    handleServerError(err);
  }
};

export default fetchAllEventsService;
