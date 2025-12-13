import getConnectionRequestService from "../../../services/user/alumni/getConnecionRequest.service.js";

const getConnectionRequestController = async (req, res, next) => {
  try {
    const requests = await getConnectionRequestService(req.user.id);
    res.status(200).json({
      success: true,
      requests,
    });
  } catch (err) {
    next(err);
  }
};

export default getConnectionRequestController;
