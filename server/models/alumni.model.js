import mongoose from "mongoose";
import { Branch, Domains, UserRole, VerificationStatus } from "../config/enums.config.js";

const alumniSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minLength: 8,
      select: false,
    },
    bio: {
      type: String,
      maxLength: 200,
    },
    role: {
      type: String,
      default: UserRole.ALUMNI,
      immutable: true,
    },
    branch: {
      type: String,
      enum: Object.values(Branch),
    },
    passoutYear: {
      type: Number,
    },
    experience: {
      type: Number,
    },
    currentCompany: {
      type: String,
    },
    skills: {
      type: [String],
      enum: Object.values(Domains),
      default: [], // Allow empty array by default
      validate: {
        validator: function (arr) {
          // Allow empty array OR 1-10 items
          return arr.length === 0 || (arr.length >= 1 && arr.length <= 10);
        },
        message: "Please select between 1 and 10 skills, or leave empty.",
      },
    },
    city: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    studentConnections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    verificationStatus: {
      type: String,
      enum: Object.values(VerificationStatus),
      default: VerificationStatus.APPLIED,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const Alumni = mongoose.model("Alumni", alumniSchema);

export default Alumni;
