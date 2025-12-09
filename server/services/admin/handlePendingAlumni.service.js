import { VerificationStatus } from "../../config/enums.config.js";
import Alumni from "../../models/alumni.model.js";
import { handleServerError, ApiError } from "../../utils/error.util.js";

const handlePendingAlumniService = async (action, alumniId) => {
  try {
    if (!action === VerificationStatus.APPROVED || !action === VerificationStatus.REJECTED) {
      throw new ApiError(400, "Invalid action");
    }

    const alumni = await Alumni.findById(alumniId);
    if (!alumni) {
      throw new ApiError(404, "Alumni not found");
    }
    if (alumni.verificationStatus !== VerificationStatus.APPLIED) {
      throw new ApiError(400, "Alumni status already processed");
    }

    alumni.verificationStatus = action;
    if (action === VerificationStatus.APPROVED) {
      alumni.isVerified = true;
    }
    await alumni.save();
    return true;
  } catch (err) {
    handleServerError(err);
  }
};

export default handlePendingAlumniService;
