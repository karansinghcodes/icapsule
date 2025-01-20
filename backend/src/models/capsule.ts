import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongoose";

interface capsule {
  title: string;
  description: string;
  owner: ObjectId;
  openDate: Date;
  files: [
    {
      fileName: string; // Name of the file
      filePath: string; // Path or URL to the file
      fileType: string; // MIME type (e.g., 'image/png', 'application/pdf')
      uploadedAt: Date;
    },
  ];
  createdAt: Date;
 
}

const capsuleSchema: Schema<capsule> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    required: true,
    type: Schema.Types.ObjectId,
  },
  openDate: {
    type: Date,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  files: [
    {
      filePath: String,
      fileType: String,
      fileName: String,
    },
  ]
});

export const capsuleModel = mongoose.model("Capule", capsuleSchema);
