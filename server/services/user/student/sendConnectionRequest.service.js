import Alumni from "../../../models/alumni.model.js";
import { ApiError, handleServerError } from "../../../utils/error.util.js";
import Request from "../../../models/request.model.js";
import { RequestStatus } from "../../../config/enums.config.js";

const sendConnectionRequestService = async (studentId, alumniId, note) => {
  try {
    // Check if alumni exists
    const alumni = await Alumni.findById(alumniId);
    if (!alumni) {
      throw new ApiError(404, "Alumni not found");
    }

    // Check if there's already a pending or accepted request
    const existingRequest = await Request.findOne({
      sender: studentId,
      receiver: alumniId,
      status: { $in: [RequestStatus.PENDING, RequestStatus.ACCEPTED] },
    });

    if (existingRequest) {
      if (existingRequest.status === RequestStatus.ACCEPTED) {
        throw new ApiError(400, "You are already connected with this alumni");
      }
      if (existingRequest.status === RequestStatus.PENDING) {
        throw new ApiError(400, "Connection request already sent");
      }
    }

    // Sanitize note
    const sanitizedNote = note && note.trim() !== "" ? note.trim() : null;

    // Create new request
    const request = new Request({
      sender: studentId,
      receiver: alumniId,
      status: RequestStatus.PENDING,
      note: sanitizedNote,
    });

    await request.save();
    return true;
  } catch (err) {
    handleServerError(err);
  }
};

export default sendConnectionRequestService;
