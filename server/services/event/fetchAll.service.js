import Event from "../../models/event.model.js";
import { handleServerError } from "../../utils/error.util.js";
import { mapEvent } from "../../utils/mapResult.util.js";

const fetchAllEventsService = async () => {
  try {
    const events = await Event.find().populate("createdBy");
    return events.map((event) => mapEvent(event));
  } catch (err) {
    handleServerError(err);
  }
};

export default fetchAllEventsService;
