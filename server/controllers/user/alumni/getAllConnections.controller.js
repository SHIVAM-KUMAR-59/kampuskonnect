import getAllConnectionsService from "../../../services/user/alumni/getAllConnections.service.js";

const getAllConnectionsController = async (req, res, next) => {
  try {
    const connections = await getAllConnectionsService(req.user.id);
    return res
      .status(200)
      .json({ success: true, message: "Connections fetched successfully", connections });
  } catch (err) {
    next(err);
  }
};

export default getAllConnectionsController;
