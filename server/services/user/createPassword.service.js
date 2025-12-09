import { ApiError, handleServerError } from "../../utils/error.util.js";
import { hashPassword } from "../../utils/bcrypt.util.js";

const createPasswordService = async (password, user) => {
    try {
        if(user.password) {
            throw new ApiError(400, "User already has a password");
        }

        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        await user.save();
        return true;
    } catch (err) {
        handleServerError(err);
    }
}

export default createPasswordService