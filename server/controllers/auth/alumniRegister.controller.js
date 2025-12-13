import alumniRegisterService from "../../services/auth/alumniRegister.service.js";

const alumniRegisterController = async (req, res, next) => {
  try {
    const { name, email, profileImage } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    if (name.trim() === "" || email.trim() === "") {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    const alumni = await alumniRegisterService(name, email.trim(), profileImage);
    return res.status(200).json({ alumni, success: true });
  } catch (err) {
    next(err);
  }
};

export default alumniRegisterController;
