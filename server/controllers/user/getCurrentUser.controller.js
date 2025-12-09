import getCurrentUser from "../../services/user/getCurrentUser.service.js";
import { isValidObjectId } from "../../utils/common.util.js";

const getCurrentUserController = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id.trim() === "") {
    return res.status(400).json({ message: "User id is required", success: false });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user id", success: false });
  }

  try {
    const user = await getCurrentUser(id, req.user);
    return res.status(200).json({ user, success: true });
  } catch (err) {
    next(err);
  }
};

export default getCurrentUserController;
