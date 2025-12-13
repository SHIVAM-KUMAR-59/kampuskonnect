const studentMiddleware = async (req, res, next) => {
  if (req.user.role !== "STUDENT" && req.user.role !== "ALUMNI") {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this.", success: false });
  }
  next();
};

export default studentMiddleware;
