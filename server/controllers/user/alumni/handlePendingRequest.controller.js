import handlePendingRequestService from "../../../services/user/alumni/handlePendingRequest.service.js";
import { isValidObjectId } from "../../../utils/common.util.js";

const handlePendingRequestController = async (req, res, next) => {
  const { requestId, action } = req.body;
  console.log(requestId, action);
  if (!requestId || !action) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }
  if (!isValidObjectId(requestId)) {
    return res.status(400).json({ message: "Invalid request id", success: false });
  }
  try {
    const updated = await handlePendingRequestService(action, requestId, req.user);
    if (!updated) {
      return res.status(500).json({ message: "Unable to process request", success: false });
    }
    return res.status(200).json({ message: "Request processed successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export default handlePendingRequestController;
