import getAllPendingAlumniService from "../../services/admin/getAllPendingAlumni.service";

const getAllPendingAlumniController = async (req, res, next) => {
  try {
    const alumnis = await getAllPendingAlumniService();
    return res.status(200).json({ alumnis, success: true });
  } catch (err) {
    next(err);
  }
};

export default getAllPendingAlumniController;
