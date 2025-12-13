import { ApiError, handleServerError } from "../../../utils/error.util.js";
import { mapAlumni } from "../../../utils/mapResult.util.js";

const updateAlumniProfileService = async (user, updatedData) => {
  try {
    const {
      name,
      email,
      bio,
      branch,
      passoutYear,
      experience,
      currentCompany,
      skills,
      city,
      linkedinUrl,
    } = updatedData;

    // Name validation
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length === 0) {
        throw new ApiError(400, "Name must be a non-empty string");
      }
      if (name.trim().length > 100) {
        throw new ApiError(400, "Name must be less than 100 characters");
      }
      user.name = name.trim();
    }

    // Email validation
    if (email !== undefined) {
      if (typeof email !== "string" || email.trim().length === 0) {
        throw new ApiError(400, "Email must be a non-empty string");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
      }

      user.username = email.toLowerCase().trim();
      user.email = email.toLowerCase().trim();
    }

    // Bio validation
    if (bio !== undefined) {
      if (bio !== null && bio !== "") {
        if (typeof bio !== "string") {
          throw new ApiError(400, "Bio must be a string");
        }
        if (bio.trim().length > 1000) {
          throw new ApiError(400, "Bio must be less than 1000 characters");
        }
        user.bio = bio.trim();
      } else {
        user.bio = bio;
      }
    }

    // Branch validation
    if (branch !== undefined) {
      if (typeof branch !== "string" || branch.trim().length === 0) {
        throw new ApiError(400, "Branch must be a non-empty string");
      }
      user.branch = branch.trim();
    }

    // Passout Year validation
    if (passoutYear !== undefined) {
      const year = parseInt(passoutYear);
      const currentYear = new Date().getFullYear();

      if (isNaN(year)) {
        throw new ApiError(400, "Passout year must be a valid number");
      }
      if (year < 1950 || year > currentYear) {
        throw new ApiError(400, `Passout year must be between 1950 and ${currentYear}`);
      }
      user.passoutYear = year;
    }

    // Experience validation
    if (experience !== undefined) {
      const exp = parseFloat(experience);

      if (isNaN(exp)) {
        throw new ApiError(400, "Experience must be a valid number");
      }
      if (exp < 0 || exp > 50) {
        throw new ApiError(400, "Experience must be between 0 and 50 years");
      }
      user.experience = exp;
    }

    // Current Company validation
    if (currentCompany !== undefined) {
      if (currentCompany !== null && currentCompany !== "") {
        if (typeof currentCompany !== "string") {
          throw new ApiError(400, "Current company must be a string");
        }
        if (currentCompany.trim().length > 200) {
          throw new ApiError(400, "Current company name must be less than 200 characters");
        }
        user.currentCompany = currentCompany.trim();
      } else {
        user.currentCompany = currentCompany;
      }
    }

    // Skills validation
    if (skills !== undefined) {
      if (!Array.isArray(skills)) {
        throw new ApiError(400, "Skills must be an array");
      }
      if (skills.length === 0) {
        throw new ApiError(400, "At least one skill must be provided");
      }
      if (skills.length > 20) {
        throw new ApiError(400, "Maximum 20 skills allowed");
      }
      // Check if all skills are valid strings
      if (!skills.every((skill) => typeof skill === "string" && skill.trim().length > 0)) {
        throw new ApiError(400, "All skills must be non-empty strings");
      }
      // Check individual skill length
      if (skills.some((skill) => skill.trim().length > 50)) {
        throw new ApiError(400, "Each skill must be less than 50 characters");
      }
      user.skills = skills.map((skill) => skill.trim());
    }

    // City validation
    if (city !== undefined) {
      if (city !== null && city !== "") {
        if (typeof city !== "string") {
          throw new ApiError(400, "City must be a string");
        }
        if (city.trim().length > 100) {
          throw new ApiError(400, "City name must be less than 100 characters");
        }
        user.city = city.trim();
      } else {
        user.city = city;
      }
    }

    // LinkedIn URL validation
    if (linkedinUrl !== undefined) {
      if (linkedinUrl !== null && linkedinUrl !== "") {
        if (typeof linkedinUrl !== "string") {
          throw new ApiError(400, "LinkedIn URL must be a string");
        }
        const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
        if (!linkedinRegex.test(linkedinUrl.trim())) {
          throw new ApiError(400, "Invalid LinkedIn URL format");
        }
        user.linkedinUrl = linkedinUrl.trim();
      } else {
        user.linkedinUrl = linkedinUrl;
      }
    }

    await user.save();
    return mapAlumni(user);
  } catch (err) {
    handleServerError(err);
  }
};

export default updateAlumniProfileService;
