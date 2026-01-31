import { UserRole } from "../../config/enums.config.js";
import Alumni from "../../models/alumni.model.js";
import Student from "../../models/student.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { generateAuthToken } from "../../utils/jwt.util.js";
import { isValidEmail } from "../../utils/regex.util.js";

const alumniRegisterService = async (name, email, profileImage) => {
  try {
    if (!isValidEmail(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    // Load both but pick whichever is not null
    const [student, alum] = await Promise.all([
      Student.findOne({ email }),
      Alumni.findOne({ email }),
    ]);

    // Determine the actual user
    const existingUser = student || alum;
    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const alumni = new Alumni({
      profileImage,
      name,
      username: email,
      email,
    });

    const token = await generateAuthToken(alumni._id, UserRole.ALUMNI);
    if (!token) {
      throw new ApiError(500, "Failed to generate authentication token");
    }

    await alumni.save();
    return {
      user: {
        id: alumni._id,
        profileImage: alumni.profileImage,
        name: alumni.name,
        email: alumni.email,
        role: UserRole.ALUMNI,
      },
      token,
    };
  } catch (err) {
    handleServerError(err);
  }
};

export default alumniRegisterService;
