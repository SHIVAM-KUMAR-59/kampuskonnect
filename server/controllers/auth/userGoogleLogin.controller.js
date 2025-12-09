import userGoogleLoginService from "../../services/auth/userGoogleLogin.service.js";

const userGoogleLoginController = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required", success: false });
    }

    const user = await userGoogleLoginService(email.trim());
    return res.status(200).json({ user, success: true });
  } catch (err) {
    next(err);
  }
};

export default userGoogleLoginController;
