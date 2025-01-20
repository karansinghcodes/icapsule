import mongoose, { Schema } from "mongoose";

export interface user {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema<user> = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const userModel = mongoose.model("User", userSchema);
