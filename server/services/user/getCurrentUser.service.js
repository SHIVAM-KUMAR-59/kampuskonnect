import { UserRole } from "../../config/enums.config.js";
import Admin from "../../models/admin.model.js";
import Alumni from "../../models/alumni.model.js";
import Student from "../../models/student.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { mapAdmin, mapAlumni, mapStudent } from "../../utils/mapResult.util.js";

const getCurrentUser = async (userId, user) => {
  console.log(user);
  try {
    if (user._id.toString() !== userId && user.role !== UserRole.ADMIN) {
      throw new ApiError(401, "You are not authorized to access this user");
    }

    const [student, alumni, admin] = await Promise.all([
      Student.findById(userId).populate("alumniConnections"),
      Alumni.findById(userId).populate("studentConnections"),
      Admin.findById(userId),
    ]);

    const existingUser = student || alumni || admin;
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    let result;
    if (user.role === UserRole.STUDENT) {
      result = mapStudent(existingUser);
    } else if (user.role === UserRole.ALUMNI) {
      result = mapAlumni(existingUser);
    } else if (user.role === UserRole.ADMIN) {
      result = mapAdmin(existingUser);
    } else {
      throw new ApiError(400, "Invalid user role");
    }

    return result;
  } catch (err) {
    console.log(err);
    handleServerError(err);
  }
};

export default getCurrentUser;
