const alumniMiddleware = async (req, res, next) => {
  if (req.user.role !== "ALUMNI" && req.user.role !== "ADMIN") {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this.", success: false });
  }
  next();
};

export default alumniMiddleware;
