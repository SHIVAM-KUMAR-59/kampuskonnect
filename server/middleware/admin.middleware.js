const adminMiddleware = async (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(401).json({ message: "You are not an admin", success: false });
    }
    next();
}

export default adminMiddleware