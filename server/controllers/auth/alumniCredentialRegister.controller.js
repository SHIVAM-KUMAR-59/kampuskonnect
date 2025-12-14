import alumniCredentialRegisterService from "../../services/auth/alumniCredentialRegister.service.js";

const alumniCredentialRegisterController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const user = await alumniCredentialRegisterService(name, email.trim(), password, trim());
    return res
      .status(201)
      .json({ success: true, message: "Alumni registered successfully", user });
  } catch (err) {
    next(err);
  }
};

export default alumniCredentialRegisterController;
