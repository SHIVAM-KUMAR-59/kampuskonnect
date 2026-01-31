import { RequestStatus } from "../../../config/enums.config.js";
import Request from "../../../models/request.model.js";
import Student from "../../../models/student.model.js";
import { handleServerError, ApiError } from "../../../utils/error.util.js";

const handlePendingRequestService = async (action, requestId, user) => {
  try {
    if (!action === RequestStatus.ACCEPTED || !action === RequestStatus.REJECTED) {
      throw new ApiError(400, "Invalid action");
    }

    if (user.studentConnections.includes(requestId)) {
      throw new ApiError(400, "You are already connected with this user");
    }

    const request = await Request.findById(requestId);
    if (!request) {
      throw new ApiError(404, "Request not found");
    }

    if (request.status !== RequestStatus.PENDING && request.status !== RequestStatus.REJECTED) {
      throw new ApiError(400, "Request already processed");
    }

    request.status = action;
    user.studentConnections.push(request.sender);

    const sendingUser = await Student.findById(request.sender);
    if (!sendingUser) {
      throw new ApiError(404, "User who sent the request is deleted");
    }

    sendingUser.alumniConnections.push(user._id);
    await sendingUser.save();
    await user.save();
    await request.save();
    return true;
  } catch (err) {
    handleServerError(err);
  }
};

export default handlePendingRequestService;
