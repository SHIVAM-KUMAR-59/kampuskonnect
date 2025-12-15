import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    alumni: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alumni",
      required: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ student: 1, alumni: 1 }, { unique: true });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
