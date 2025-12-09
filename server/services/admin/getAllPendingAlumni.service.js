import { VerificationStatus } from "../../config/enums.config.js";
import Alumni from "../../models/alumni.model.js";
import { handleServerError } from "../../utils/error.util.js";
import { mapAlumni } from "../../utils/mapResult.util.js";

const getAllPendingAlumniService = async () => {
  try {
    const allAlumnis = await Alumni.find({ verificationStatus: VerificationStatus.APPLIED });
    const alumnis = allAlumnis.map((alumni) => mapAlumni(alumni));
    return alumnis;
  } catch (err) {
    handleServerError(err);
  }
};

export default getAllPendingAlumniService;
