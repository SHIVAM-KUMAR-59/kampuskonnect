import mongoose from "mongoose";
import { EventMode } from "../config/enums.config.js";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    description: {
      type: String,
      requried: true,
      minLength: 10,
      maxLength: 1000,
    },
    registrationFee: {
      type: Number,
      default: 0,
    },
    mode: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      enum: Object.values(EventMode),
    },
    date: {
      type: Date,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
