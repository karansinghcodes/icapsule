import { Request, Response } from "express";
import { cloudinaryUpload } from "../utils/cloudUpload";
import { RequestWithUser } from "./createCapsule";
import {  userModel } from "../models/user";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const request = req as RequestWithUser;
    const fileName = request.file?.originalname; 
    if (fileName) {
      const existingUser = await userModel.findOne({ email: request.userEmail });
      if (existingUser) {
        if (!existingUser.encryptionStarted) {
          existingUser.encryptionStarted = true;
        }
        const response = await cloudinaryUpload(fileName);
        if (response?.success) {
          res.status(200).json({
            message: "file Uploaded successfully",
            fileDeatils: request.file,
            success: true,
            fileUrl: response.data,
          });
        } else {
          res
            .status(203)
            .json({ message: "File uploading failed", success: false });
        }
      }
    }
  } catch (error) {
    console.error("Problem Uploading Files on Cloud", error);
    res.status(500).json({ message: "problem uploading file", success: false });
  }
};
