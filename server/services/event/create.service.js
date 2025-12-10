import Event from "../../models/event.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { EventMode } from "../../config/enums.config.js";

const createEventService = async (eventData, user) => {
  try {
    const {
      name,
      description,
      registrationFee,
      mode,
      venue,
      date,
      deadline,
      duration,
      startTime,
      endTime,
    } = eventData;

    if (name.length < 2) {
      throw new ApiError(400, "Event name must be at least 2 characters long");
    }

    if (
      !description ||
      description.trim() === "" ||
      description.length < 10 ||
      description.length > 1000
    ) {
      throw new ApiError(400, "Description must be between 10 and 1000 characters");
    }

    if (registrationFee < 0) {
      throw new ApiError(400, "Registration fee cannot be negative");
    }

    if (!mode || !Object.values(EventMode).includes(mode)) {
      throw new ApiError(400, "Invalid event mode");
    }

    if (venue && typeof venue !== "string") {
      throw new ApiError(400, "Venue must be a valid string");
    }

    if (!date || isNaN(new Date(date))) {
      throw new ApiError(400, "Event date is invalid");
    }

    if (!deadline || isNaN(new Date(deadline))) {
      throw new ApiError(400, "Deadline date is invalid");
    }

    if (new Date(deadline) >= new Date(date)) {
      throw new ApiError(400, "Deadline must be before event date");
    }

    if (!duration || duration <= 0) {
      throw new ApiError(400, "Duration must be greater than 0");
    }

    if (startTime && !/^\d{2}:\d{2}$/.test(startTime)) {
      throw new ApiError(400, "Invalid start time format (use HH:MM)");
    }

    if (endTime && !/^\d{2}:\d{2}$/.test(endTime)) {
      throw new ApiError(400, "Invalid end time format (use HH:MM)");
    }

    // If both present, end must be after start
    if (startTime && endTime) {
      const [sh, sm] = startTime.split(":");
      const [eh, em] = endTime.split(":");

      const start = sh * 60 + sm * 1;
      const end = eh * 60 + em * 1;

      if (end <= start) {
        throw new ApiError(400, "End time must be later than start time");
      }
    }

    const event = await Event.create({
      name,
      description,
      registrationFee,
      mode,
      venue,
      date,
      deadline,
      duration,
      startTime,
      endTime,
      createdBy: user,
    });

    return event;
  } catch (err) {
    handleServerError(err);
  }
};

export default createEventService;
