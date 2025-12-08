import studentRegisterService from "../../services/auth/studentRegister.service.js";

const studentRegisterController = async (req, res, next) => {
  try {
    const { name, email, profileImage } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    if (name.trim() === "" || email.trim() === "") {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    const student = await studentRegisterService(name, email.trim(), profileImage);
    return res.status(200).json({ student, success: true });
  } catch (err) {
    next(err);
  }
};

export default studentRegisterController;
