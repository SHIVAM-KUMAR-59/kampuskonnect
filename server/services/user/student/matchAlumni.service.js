import { ApiError, handleServerError } from "../../../utils/error.util.js";
import Alumni from "../../../models/alumni.model.js";
import Student from "../../../models/student.model.js";
import Request from "../../../models/request.model.js";
import { mapAlumni } from "../../../utils/mapResult.util.js";

const matchAlumniService = async (studentId, criteria = {}) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    // Find all alumni IDs that the student has already sent a request to
    const existingRequests = await Request.find({ sender: studentId }).select("receiver");
    const excludedAlumniIds = existingRequests.map((req) => req.receiver);

    // Build query for matching alumni
    let query = {
      verificationStatus: "APPROVED",
      _id: { $nin: excludedAlumniIds }, // exclude already requested alumni
    };

    if (criteria.domain) {
      query.skills = criteria.domain;
    } else if (student.interests && student.interests.length > 0) {
      query.skills = { $in: student.interests };
    }

    if (criteria.branch) query.branch = criteria.branch;
    if (criteria.passoutYear) query.passoutYear = criteria.passoutYear;
    if (criteria.currentCompany)
      query.currentCompany = { $regex: criteria.currentCompany, $options: "i" };
    if (criteria.city) query.city = { $regex: criteria.city, $options: "i" };
    if (criteria.minExperience) query.experience = { $gte: parseFloat(criteria.minExperience) };
    if (criteria.maxExperience)
      query.experience = { ...query.experience, $lte: parseFloat(criteria.maxExperience) };

    const matchedAlumni = await Alumni.find(query)
      .sort({ experience: -1 })
      .limit(criteria.limit || 50);

    // Add match score and matching skills
    const alumnisWithScores = matchedAlumni.map((alumni) => {
      const alumniObj = alumni.toObject();
      const matchingSkills = student.interests.filter((interest) =>
        alumni.skills.includes(interest)
      );
      alumniObj.matchScore = matchingSkills.length;
      alumniObj.matchingSkills = matchingSkills;
      return alumniObj;
    });

    // Sort by match score descending
    alumnisWithScores.sort((a, b) => b.matchScore - a.matchScore);

    return alumnisWithScores.map((alumni) => mapAlumni(alumni));
  } catch (err) {
    handleServerError(err);
  }
};

export default matchAlumniService;
