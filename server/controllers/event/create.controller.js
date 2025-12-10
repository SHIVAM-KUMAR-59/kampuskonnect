import createEventService from "../../services/event/create.service.js";

const createEventController = async (req, res, next) => {
  try {
    const { eventData } = req.body;

    if (!eventData) {
      return res.status(400).json({ message: "Insufficient data provided", success: false });
    }
    if (!eventData.name || eventData.name.trim() === "") {
      return res.status(400).json({ message: "Event name is required", success: false });
    }

    const event = await createEventService(eventData, req.user);

    return res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    next(error);
  }
};

export default createEventController;
