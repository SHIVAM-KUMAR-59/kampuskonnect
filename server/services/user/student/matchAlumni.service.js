import { ApiError, handleServerError } from "../../../utils/error.util.js";
import Alumni from "../../../models/alumni.model.js";
import Student from "../../../models/student.model.js";
import { mapAlumni } from "../../../utils/mapResult.util.js";

const matchAlumniService = async (studentId, criteria = {}) => {
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    console.log("Student interests:", student.interests);

    let query = {
      verificationStatus: "APPROVED",
    };

    if (criteria.domain) {
      query.skills = criteria.domain;
    } else if (student.interests && student.interests.length > 0) {
      query.skills = { $in: student.interests };
    }

    console.log("Query:", JSON.stringify(query, null, 2));

    // Additional filters from criteria
    if (criteria.branch) {
      query.branch = criteria.branch;
    }

    if (criteria.passoutYear) {
      query.passoutYear = criteria.passoutYear;
    }

    if (criteria.currentCompany) {
      query.currentCompany = { $regex: criteria.currentCompany, $options: "i" };
    }

    if (criteria.city) {
      query.city = { $regex: criteria.city, $options: "i" };
    }

    if (criteria.minExperience) {
      query.experience = { $gte: parseFloat(criteria.minExperience) };
    }

    if (criteria.maxExperience) {
      query.experience = { ...query.experience, $lte: parseFloat(criteria.maxExperience) };
    }

    const matchedAlumni = await Alumni.find(query)
      .select("-password -refreshToken")
      .sort({ experience: -1 })
      .limit(criteria.limit || 50);

    if (matchedAlumni.length > 0) {
      console.log("First alumni skills:", matchedAlumni[0].skills);
    }

    const alumniWithScores = matchedAlumni.map((alumni) => {
      const alumniObj = alumni.toObject();

      const matchingSkills = student.interests.filter((interest) =>
        alumni.skills.includes(interest)
      );

      alumniObj.matchScore = matchingSkills.length;
      alumniObj.matchingSkills = matchingSkills;

      return alumniObj;
    });

    alumniWithScores.sort((a, b) => b.matchScore - a.matchScore);
    
    const alumnis = alumniWithScores.map((alumni) => {
      return mapAlumni(alumni);
    });
    
    return alumnis;
  } catch (err) {
    console.log(err);
    handleServerError(err);
  }
};

export default matchAlumniService;
