import { UserRole } from "../../config/enums.config.js";
import Alumni from "../../models/alumni.model.js";
import Student from "../../models/student.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";

const deleteUserService = async (user, userId) => {
  try {
    if (user._id.toString() !== userId && user.role !== UserRole.ADMIN) {
      console.log("UserID", user._id, userId);
      throw new ApiError(401, "You are not authorized to delete this user");
    }
    if (user.role === UserRole.STUDENT) {
      await Student.findByIdAndDelete(userId);
    } else if (user.role === UserRole.ALUMNI) {
      await Alumni.findByIdAndDelete(userId);
    } else {
      throw new ApiError(400, "Invalid user role");
    }
    return true;
  } catch (err) {
    handleServerError(err);
  }
};

export default deleteUserService;
