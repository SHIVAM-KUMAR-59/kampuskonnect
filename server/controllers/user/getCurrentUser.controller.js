import getCurrentUser from "../../services/user/getCurrentUser.service.js";

const getCurrentUserController = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user);
    return res.status(200).json({ user, success: true });
  } catch (err) {
    next(err);
  }
};

export default getCurrentUserController;
