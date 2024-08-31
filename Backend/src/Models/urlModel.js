import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    vistHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

export const URL = mongoose.model("urls", UrlSchema);
