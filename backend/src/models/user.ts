import mongoose, { Schema } from "mongoose";

export interface user {
  name: string;
  email: string;
  password: string;
  encryptionStarted:boolean
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
  },encryptionStarted:{
    type:Boolean,
    default:false
  }
});

export const userModel = mongoose.model("User", userSchema);
