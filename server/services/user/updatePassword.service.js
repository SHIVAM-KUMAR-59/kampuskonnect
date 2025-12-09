import { ApiError, handleServerError } from "../../utils/error.util.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.util.js";

const updatePasswordService = async (oldPassword, newPassword, user) => {
  if (oldPassword === newPassword) {
    throw new ApiError(400, "New password cannot be same as old password");
  }

  try {
    if (!user.password) {
      throw new ApiError(400, "User does not have a password, set a password first");
    }

    const isPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid old password");
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    return true;
  } catch (err) {
    handleServerError(err);
  }
};

export default updatePasswordService;
