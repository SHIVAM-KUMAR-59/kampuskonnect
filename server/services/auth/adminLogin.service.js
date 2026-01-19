import Admin from "../../models/admin.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { generateAuthToken } from "../../utils/jwt.util.js";
import { isValidEmail } from "../../utils/regex.util.js";
import { comparePassword } from "../../utils/bcrypt.util.js";

const adminLoginService = async (email, password) => {
  if (!isValidEmail(email)) {
    throw new ApiError(400, "Invalid email format");
  }
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      throw new ApiError(404, "Admin with this email do not exist");
    }
    // const isPasswordValid = await comparePassword(password, existingAdmin.password)
    // if (!isPasswordValid) {
    //     throw new ApiError(400, "Invalid password")
    // }

    const token = await generateAuthToken(existingAdmin._id, existingAdmin.role);
    return {
      admin: {
        id: existingAdmin._id,
        profileImage: existingAdmin.profileImage,
        name: existingAdmin.name,
        email: existingAdmin.email,
        role: existingAdmin.role,
      },
      token,
    };
  } catch (err) {
    handleServerError(err);
  }
};

export default adminLoginService;
