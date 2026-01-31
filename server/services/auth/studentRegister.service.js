import { UserRole } from "../../config/enums.config.js";
import Alumni from "../../models/alumni.model.js";
import Student from "../../models/student.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { generateAuthToken } from "../../utils/jwt.util.js";
import { isValidEmail } from "../../utils/regex.util.js";

const studentRegisterService = async (name, email, profileImage) => {
  try {
    if (!isValidEmail(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    if (!email.endsWith("@kiit.ac.in")) {
      throw new ApiError(400, "Only KIIT email addresses are allowed");
    }

    // Load both but pick whichever is not null
    const [existingStudent, alum] = await Promise.all([
      Student.findOne({ email }),
      Alumni.findOne({ email }),
    ]);

    // Determine the actual user
    const existingUser = existingStudent || alum;
    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const student = new Student({
      profileImage,
      name,
      username: email,
      email,
    });

    const token = await generateAuthToken(student._id, UserRole.STUDENT);
    if (!token) {
      throw new ApiError(500, "Failed to generate authentication token");
    }

    await student.save();
    return {
      user: {
        id: student._id,
        profileImage: student.profileImage,
        name: student.name,
        email: student.email,
        role: UserRole.STUDENT,
      },
      token,
    };
  } catch (err) {
    handleServerError(err);
  }
};

export default studentRegisterService;
