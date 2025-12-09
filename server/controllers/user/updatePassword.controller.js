import updatePasswordService from "../../services/user/updatePassword.service.js";

const updatePasswordController = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }
  if (oldPassword.trim() === "" || newPassword.trim() === "") {
    return res.status(400).json({ message: "All fields are required", success: false });
  }
  try {
    const updated = await updatePasswordService(oldPassword, newPassword, req.user);
    if (!updated) {
      return res.status(500).json({ message: "Unable to update password", success: false });
    }
    return res.status(200).json({ message: "Password updated successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export default updatePasswordController;
