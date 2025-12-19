import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: String,
    desc: String,
    time: String,
    revisions: String,
    author: String,
    country: String,
    category: String,
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
