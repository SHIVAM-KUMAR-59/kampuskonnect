import adminLoginService from "../../services/auth/adminLogin.service.js";

const adminLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are is required", success: false });
    }

    if (email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ message: "All fields are is required", success: false });
    }

    const user = await adminLoginService(email.trim(), password.trim());
    return res.status(200).json({ user, success: true });
  } catch (err) {
    next(err);
  }
};

export default adminLoginController;
