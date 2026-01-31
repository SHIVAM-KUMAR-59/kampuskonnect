import { UserRole } from "../../config/enums.config.js";
import Alumni from "../../models/alumni.model.js";
import Student from "../../models/student.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { generateAuthToken } from "../../utils/jwt.util.js";
import { isValidEmail } from "../../utils/regex.util.js";
import { hashPassword } from "../../utils/bcrypt.util.js";

const alumniCredentialRegisterService = async (name, email, password) => {
  try {
    if (!isValidEmail(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    if (password.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters long");
    }

    if (name.trim().length === 0) {
      throw new ApiError(400, "Name cannot be empty");
    }

    if (name.length < 2) {
      throw new ApiError(400, "Name must be at least 2 characters long");
    }

    if (name.length > 100) {
      throw new ApiError(400, "Name cannot exceed 100 characters");
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

    const hashedPassword = await hashPassword(password);

    const alumni = new Alumni({
      name,
      username: email,
      email,
      password: hashedPassword,
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

export default alumniCredentialRegisterService;
