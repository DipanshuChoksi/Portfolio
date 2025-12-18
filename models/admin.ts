import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminModel =
  mongoose.models.admins || mongoose.model("admins", adminSchema);

export default AdminModel;
