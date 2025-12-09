import handlePendingAlumniService from "../../services/admin/handlePendingAlumni.service.js";
import { isValidObjectId } from "../../utils/common.util.js";

const handlePendingAlumniController = async (req, res, next) => {
  const { alumniId, action } = req.body;
  if (!alumniId || !action) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }
  if (!isValidObjectId(alumniId)) {
    return res.status(400).json({ message: "Invalid alumni id", success: false });
  }
  try {
    const updated = await handlePendingAlumniService(action, alumniId);
    if (!updated) {
      return res.status(500).json({ message: "Unable to update alumni", success: false });
    }
    return res.status(200).json({ message: "Alumni status updated successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export default handlePendingAlumniController;
