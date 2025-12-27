import getUserOverviewService from "../../services/user/overview.service.js";

const getUserOverviewController = async (req, res, next) => {
  try {
    const user = await getUserOverviewService(req.user.id, req.user.role);
    return res.status(200).json({ user, success: true });
  } catch (err) {
    next(err);
  }
};

export default getUserOverviewController;
