import Student from "../../../models/student.model.js";
import { ApiError, handleServerError } from "../../../utils/error.util.js";
import { mapAlumni } from "../../../utils/mapResult.util.js";

const getAllConnectionsService = async (userId) => {
  try {
    const user = await Student.findById(userId).populate("alumniConnections");
    if (!user) {
      throw new ApiError("User not found");
    }

    const connections = user.alumniConnections.map((connection) => {
      return mapAlumni(connection);
    });
    return connections;
  } catch (err) {
    console.log(err);
    handleServerError(err);
  }
};

export default getAllConnectionsService;
