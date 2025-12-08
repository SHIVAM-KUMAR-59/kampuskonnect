import userCredentialsLoginService from "../../services/auth/userCredentialsLogin.service.js";

const userCredentialsLoginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        if (name.trim() === "" || password.trim() === "") {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const user = await userCredentialsLoginService(email.trim(), password);
        return res.status(200).json({ user, success: true });
    } catch (err) {
        next(err);
    }
}

export default userCredentialsLoginController