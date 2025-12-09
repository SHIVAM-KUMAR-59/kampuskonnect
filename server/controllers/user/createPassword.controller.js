import createPasswordService from "../../services/user/createPassword.service.js";

const createPasswordController = async (req, res, next) => {
    const { password } = req.body
    if (!password || password.trim() === "") {
        return res.status(400).json({ message: "Password is required", success: false });
    }

    try {
        const created = await createPasswordService(password, req.user)
        if (!created) {
            return res.status(500).json({ message: "Unable to create password", success: false });
        }
        return res.status(200).json({ message: "Password created successfully", success: true });
    } catch (err) {
        next(err)
    }
}

export default createPasswordController