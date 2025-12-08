import mongoose from "mongoose";
import { Branch, UserRole, VerificationStatus } from "../config/enums.config.js";

const alumniSchema = new mongoose.Schema(
  {
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
      default: [],
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
