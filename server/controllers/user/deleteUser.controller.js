import deleteUserService from "../../services/user/deleteUser.service.js";
import { isValidObjectId } from "../../utils/common.util.js";

const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User id is required", success: false });
    }

    const isValidId = isValidObjectId(id)
    if (!isValidId) {
      return res.status(400).json({ message: "Invalid user id", success: false });
    }
    const deleted = await deleteUserService(req.user, id);
    if (!deleted) {
      return res.status(500).json({ message: "Unable to delete user", success: false });
    }
    return res.status(200).json({ message: "User deleted successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export default deleteUserController;
