import mongoose from "mongoose";

export const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  } else {
    return true;
  }
};
