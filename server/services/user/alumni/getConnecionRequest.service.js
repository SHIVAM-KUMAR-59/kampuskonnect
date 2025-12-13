import { handleServerError } from "../../../utils/error.util.js";
import Request from "../../../models/request.model.js";
import { RequestStatus, UserRole } from "../../../config/enums.config.js";
import { mapRequest } from "../../../utils/mapResult.util.js";

const getConnectionRequestService = async (userId) => {
  try {
    const requests = await Request.find({
      receiver: userId,
      status: RequestStatus.PENDING,
    }).populate("sender", "name email profilePicture linkedinUrl interests bio");

    console.log("Found requests:", requests.length);
    return requests.map(mapRequest);
  } catch (err) {
    console.log(err);
    handleServerError(err);
  }
};

export default getConnectionRequestService;
