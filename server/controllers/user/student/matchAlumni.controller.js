import matchAlumniService from "../../../services/user/student/matchAlumni.service.js";

const matchAlumniController = async (req, res, next) => {
  try {
    const studentId = req.user.id;

    // Extract criteria from query params
    const criteria = {
      domain: req.query.domain, // Specific domain to filter
      branch: req.query.branch,
      passoutYear: req.query.passoutYear ? parseInt(req.query.passoutYear) : undefined,
      currentCompany: req.query.currentCompany,
      city: req.query.city,
      minExperience: req.query.minExperience,
      maxExperience: req.query.maxExperience,
      limit: req.query.limit ? parseInt(req.query.limit) : 50,
    };

    // Remove undefined values
    Object.keys(criteria).forEach((key) => criteria[key] === undefined && delete criteria[key]);

    const matchedAlumni = await matchAlumniService(studentId, criteria);

    return res.status(200).json({
      success: true,
      message: "Alumni matched successfully",
      count: matchedAlumni.length,
      data: matchedAlumni,
    });
  } catch (err) {
    next(err);
  }
};

export default matchAlumniController;
