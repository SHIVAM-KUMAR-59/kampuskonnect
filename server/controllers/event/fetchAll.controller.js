import fetchAllEventsService from "../../services/event/fetchAll.service.js";

const fetchAllEventsController = async (req, res, next) => {
  try {
    const events = await fetchAllEventsService();
    return res.status(200).json({ events, success: true, message: "Events fetched successfully" });
  } catch (err) {
    next(err);
  }
};

export default fetchAllEventsController;
