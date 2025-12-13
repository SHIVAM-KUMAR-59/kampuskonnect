import Event from "../../models/event.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { EventMode } from "../../config/enums.config.js";
import { mapEvent } from "../../utils/mapResult.util.js";

const editEventService = async (eventId, eventData, userId) => {
  try {
    // Find the event
    const event = await Event.findById(eventId);

    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    // Check if user is the creator
    if (event.createdBy.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not authorized to edit this event");
    }

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

    // Validate name
    if (name !== undefined) {
      if (!name || name.trim() === "") {
        throw new ApiError(400, "Event name cannot be empty");
      }
      if (name.trim().length < 2) {
        throw new ApiError(400, "Event name must be at least 2 characters long");
      }
      event.name = name.trim();
    }

    // Validate description
    if (description !== undefined) {
      if (!description || description.trim() === "") {
        throw new ApiError(400, "Description cannot be empty");
      }
      if (description.length < 10 || description.length > 1000) {
        throw new ApiError(400, "Description must be between 10 and 1000 characters");
      }
      event.description = description.trim();
    }

    // Validate registration fee
    if (registrationFee !== undefined) {
      if (registrationFee < 0) {
        throw new ApiError(400, "Registration fee cannot be negative");
      }
      event.registrationFee = registrationFee;
    }

    // Validate mode
    if (mode !== undefined) {
      if (!Object.values(EventMode).includes(mode)) {
        throw new ApiError(400, "Invalid event mode");
      }
      event.mode = mode;
    }

    // Validate venue
    if (venue !== undefined) {
      if (venue !== null && typeof venue !== "string") {
        throw new ApiError(400, "Venue must be a valid string");
      }
      event.venue = venue;
    }

    // Validate dates
    if (date !== undefined || deadline !== undefined) {
      const newDate = date ? new Date(date) : event.date;
      const newDeadline = deadline ? new Date(deadline) : event.deadline;
      const now = new Date();

      if (isNaN(newDate)) {
        throw new ApiError(400, "Invalid event date");
      }

      if (isNaN(newDeadline)) {
        throw new ApiError(400, "Invalid deadline date");
      }

      if (newDate < now) {
        throw new ApiError(400, "Event date cannot be in the past");
      }

      if (newDeadline < now) {
        throw new ApiError(400, "Deadline cannot be in the past");
      }

      if (newDeadline >= newDate) {
        throw new ApiError(400, "Deadline must be before event date");
      }

      if (date !== undefined) event.date = newDate;
      if (deadline !== undefined) event.deadline = newDeadline;
    }

    // Validate duration
    if (duration !== undefined) {
      if (duration <= 0) {
        throw new ApiError(400, "Duration must be greater than 0");
      }
      event.duration = duration;
    }

    // Validate start time
    if (startTime !== undefined) {
      if (startTime !== null && !/^\d{2}:\d{2}$/.test(startTime)) {
        throw new ApiError(400, "Invalid start time format (use HH:MM)");
      }
      event.startTime = startTime;
    }

    // Validate end time
    if (endTime !== undefined) {
      if (endTime !== null && !/^\d{2}:\d{2}$/.test(endTime)) {
        throw new ApiError(400, "Invalid end time format (use HH:MM)");
      }
      event.endTime = endTime;
    }

    // Validate time relationship
    const finalStartTime = startTime !== undefined ? startTime : event.startTime;
    const finalEndTime = endTime !== undefined ? endTime : event.endTime;

    if (finalStartTime && finalEndTime) {
      const [sh, sm] = finalStartTime.split(":");
      const [eh, em] = finalEndTime.split(":");

      const start = parseInt(sh) * 60 + parseInt(sm);
      const end = parseInt(eh) * 60 + parseInt(em);

      if (end <= start) {
        throw new ApiError(400, "End time must be later than start time");
      }
    }

    await event.save();
    return mapEvent(event);
  } catch (err) {
    handleServerError(err);
  }
};

export default editEventService;
