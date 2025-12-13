import sendConnectionRequestService from "../../../services/user/student/sendConnectionRequest.service.js";

const sendConnectionRequestController = async (req, res, next) => {
  try {
    const { id: alumniId } = req.params;
    if (!alumniId) {
      return res.status(400).json({ message: "Alumni ID is required" });
    }

    let note = null;
    if (req.body && req.body.note) {
      note = req.body.note;
    }
    await sendConnectionRequestService(req.user.id, alumniId, note);

    return res.status(200).json({ message: "Connection request sent successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export default sendConnectionRequestController;
