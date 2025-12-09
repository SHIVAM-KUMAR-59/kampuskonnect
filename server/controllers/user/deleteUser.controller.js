import mongoose from "mongoose";
import deleteUserService from "../../services/user/deleteUser.service.js";

const deleteUserController = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "User id is required", success: false });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format",
            });
        }
        const deleted = await deleteUserService(req.user, id);
        if (!deleted) {
            return res.status(500).json({ message: "Unable to delete user", success: false });
        }
        return res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (err) {
        next(err);
    }
}

export default deleteUserController