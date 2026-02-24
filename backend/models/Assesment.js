import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dosha: String,
  data: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Assessment", assessmentSchema);
