import updateAlumniProfileService from "../../../services/user/alumni/updateProfile.service.js";

const updateAlumniProfileController = async (req, res, next) => {
  try {
    const user = await updateAlumniProfileService(req.user, req.body);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export default updateAlumniProfileController;
