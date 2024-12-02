import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, default: "" },
  tag: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Ensure indexes for createdAt and updatedAt fields
UserSchema.index({ createdAt: 1, updatedAt: 1 });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
