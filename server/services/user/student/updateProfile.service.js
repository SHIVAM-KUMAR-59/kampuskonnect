import { ApiError, handleServerError } from "../../../utils/error.util.js";
import { mapStudent } from "../../../utils/mapResult.util.js";

const updateStudentProfileService = async (user, updateData) => {
  try {
    const { name, email, phoneNumber, bio, linkedinUrl, branch, interests, graduationYear } =
      updateData;

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
      // KIIT email validation (ends with @kiit.ac.in)
      if (!email.endsWith("@kiit.ac.in")) {
        throw new ApiError(400, "Email must be a valid KIIT email address");
      }
      user.username = email.toLowerCase().trim();
      user.email = email.toLowerCase().trim();
    }

    // Phone number validation
    if (phoneNumber !== undefined) {
      if (phoneNumber !== null && phoneNumber !== "") {
        if (typeof phoneNumber !== "string") {
          throw new ApiError(400, "Phone number must be a string");
        }
        const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number
        if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ""))) {
          throw new ApiError(400, "Invalid phone number format");
        }
        user.phoneNumber = phoneNumber.trim();
      } else {
        user.phoneNumber = phoneNumber;
      }
    }

    // Bio validation
    if (bio !== undefined) {
      if (bio !== null && bio !== "") {
        if (typeof bio !== "string") {
          throw new ApiError(400, "Bio must be a string");
        }
        if (bio.trim().length > 500) {
          throw new ApiError(400, "Bio must be less than 500 characters");
        }
        user.bio = bio.trim();
      } else {
        user.bio = bio;
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

    // Branch validation
    if (branch !== undefined) {
      if (typeof branch !== "string" || branch.trim().length === 0) {
        throw new ApiError(400, "Branch must be a non-empty string");
      }
      user.branch = branch.trim();
    }

    // Interests validation
    if (interests !== undefined) {
      if (!Array.isArray(interests)) {
        throw new ApiError(400, "Interests must be an array");
      }
      if (interests.length === 0) {
        throw new ApiError(400, "At least one interest must be selected");
      }
      if (interests.length > 5) {
        throw new ApiError(400, "Maximum 5 interests allowed");
      }
      // Check if all interests are valid strings
      if (
        !interests.every((interest) => typeof interest === "string" && interest.trim().length > 0)
      ) {
        throw new ApiError(400, "All interests must be non-empty strings");
      }
      user.interests = interests.map((interest) => interest.trim());
    }

    // Graduation year validation
    if (graduationYear !== undefined) {
      const year = parseInt(graduationYear);
      const currentYear = new Date().getFullYear();

      if (isNaN(year)) {
        throw new ApiError(400, "Graduation year must be a valid number");
      }
      if (year < currentYear || year > currentYear + 10) {
        throw new ApiError(
          400,
          `Graduation year must be between ${currentYear} and ${currentYear + 10}`
        );
      }
      user.graduationYear = year;
    }

    await user.save();
    return mapStudent(user);
  } catch (err) {
    console.log(err);
    handleServerError(err);
  }
};

export default updateStudentProfileService;
