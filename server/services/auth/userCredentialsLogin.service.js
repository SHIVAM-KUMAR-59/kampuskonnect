import Alumni from "../../models/alumni.model.js";
import Student from "../../models/student.model.js";
import { comparePassword } from "../../utils/bcrypt.util.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { generateAuthToken } from "../../utils/jwt.util.js";

const userCredentialsLoginService = async (email, password) => {
  try {
    // Load both but pick whichever is not null
    const [student, alumni] = await Promise.all([
      Student.findOne({ email }),
      Alumni.findOne({ email }),
    ]);

    // Determine the actual user
    const existingUser = student || alumni;

    if (!existingUser) {
      throw new ApiError(404, "User with this email does not exist");
    }

    if (!existingUser.password) {
      throw new ApiError(400, "User does not have a password");
    }

    // validate password
    const isPasswordValid = await comparePassword(password, existingUser.password);

    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid password");
    }

    // generate JWT
    const token = await generateAuthToken(existingUser._id, existingUser.role);

    return {
      user: {
        id: existingUser._id,
        profileImage: existingUser.profileImage,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      token,
    };
  } catch (err) {
    handleServerError(err);
  }
};

export default userCredentialsLoginService;
