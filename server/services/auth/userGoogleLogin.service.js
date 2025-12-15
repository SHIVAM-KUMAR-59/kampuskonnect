import Alumni from "../../models/alumni.model.js";
import Student from "../../models/student.model.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";
import { generateAuthToken } from "../../utils/jwt.util.js";

const userGoogleLoginService = async (email) => {
  try {
    // Load both but pick whichever is not null
    const [student, alumni] = await Promise.all([
      Student.findOne({ email }),
      Alumni.findOne({ email }),
    ]);

    // Determine the actual user
    const existingUser = student || alumni;
    console.log(existingUser);

    if (!existingUser) {
      throw new ApiError(404, "User with this email does not exist");
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
    console.log(err);
    handleServerError(err);
  }
};

export default userGoogleLoginService;
