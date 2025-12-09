import mongoose from "mongoose";
import { UserRole } from "../config/enums.config.js";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    },
    phoneNumber: {
      type: String,
      minLength: 10,
      maxLength: 10,
    },
    password: {
      type: String,
      minLength: 8,
    },
    privileges: {
      editUsers: { type: Boolean, default: true },
      verifyAlumni: { type: Boolean, default: true },
    },
    role: {
      type: String,
      default: UserRole.ADMIN,
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
