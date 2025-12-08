import mongoose from "mongoose";
import { Branch } from "../config/enums.config.js";

const studentSchema = new mongoose.Schema(
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
