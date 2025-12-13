import editEventService from "../../services/event/edit.service.js";

const editEventController = async (req, res, next) => {
  try {
    const { id: eventId } = req.params;
    const userId = req.user.id;

    if (!eventId) {
      return res.status(400).json({ 
        success: false,
        message: "Event ID is required" 
      });
    }

    const updatedEvent = await editEventService(eventId, req.body, userId);

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (err) {
    next(err);
  }
};

export default editEventController;