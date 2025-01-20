import { Request, Response } from "express";
import { cloudinaryUpload } from "../utils/cloudUpload";

export const uploadFile = async (req: Request, res: Response) => {
  const fileName = req.file?.originalname;
  if (fileName) {
    const response = await cloudinaryUpload(fileName);
    if (response?.success) {
      res.status(200).json({
        message: "file Uploaded successfully",
        fileDeatils: req.file,
        success: true,
        fileUrl: response.data,
      });
    } else {
      res
        .status(203)
        .json({ message: "File uploading failed", success: false });
    }
  }
};
