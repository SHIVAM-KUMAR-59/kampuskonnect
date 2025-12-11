import mongoose from "mongoose";
import { Branch, UserRole } from "../config/enums.config.js";

const studentSchema = new mongoose.Schema(
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
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phoneNumber: {
      type: String,
      minLength: 10,
      maxLength: 10,
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
    linkedinUrl: {
      type: String,
    },
    role: {
      type: String,
      default: UserRole.STUDENT,
      immutable: true,
    },
    branch: {
      type: String,
      enum: Object.values(Branch),
    },
    interests: {
      type: [String],
      default: [],
    },
    graduationYear: {
      type: Number,
    },
    linkedinUrl: {
      type: String,
    },
    alumniConnections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alumni",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
