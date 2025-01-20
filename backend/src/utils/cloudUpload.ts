import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName,
} from "../helpers/config";
import path from "path";

const localPath = path.resolve(__dirname, "../../public/tmp");

export const cloudinaryUpload = async (fileName: string) => {
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret, // Click 'View API Keys' above to copy your API secret
  });
  try {
    if (!fileName) return null;

    const response = await cloudinary.uploader.upload(
      `${localPath}/${fileName}`,
      {
        resource_type: "auto",
      }
    );
    const data = response.url;
    console.log("file Uploaded");
    return { data, success: true };
  } catch (error) {
    fs.unlinkSync(`${localPath}/${fileName}`);
    console.log(error);
    return null;
  }
};
