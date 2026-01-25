import Alumni from "../../../models/alumni.model.js";
import { ApiError, handleServerError } from "../../../utils/error.util.js";
import { mapStudent } from "../../../utils/mapResult.util.js";

const getAllConnectionsService = async (userId) => {
  try {
    const user = await Alumni.findById(userId).populate("studentConnections");
    if (!user) {
      throw new ApiError("User not found");
    }

    let connections = user.studentConnections.map((connection) => {
      return mapStudent(connection);
    });
    connections = connections.filter(
      (conn, index, self) => index === self.findIndex((c) => c.id === conn.id)
    );
    return connections;
  } catch (err) {
    console.log(err);
    handleServerError(err);
  }
};

export default getAllConnectionsService;
