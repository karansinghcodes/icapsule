import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.resolve(__dirname, "../../.env") });


export const saltRounds: number = parseInt(process.env.SALTROUNDS || "10", 10);
export const secretKey: string = process.env.JWTSECRETKEY || "";
export const mongodbPassword: string = process.env.MONGODBPASSWORD || "";
export const mongodbUsername: string = process.env.MONGODBUSERNAME || "";
export const portNumber: number = parseInt(
  process.env.PORTNUMBER || "3000",
  10
);
export const mongodbUri: string = process.env.MONGODBURI || "";
export const cloudinaryApiSecret: string =
  process.env.CLOUDINARY_API_SECRET || "";
export const cloudinaryCloudName: string =
  process.env.CLOUDINARY_CLOUD_NAME || "";
export const cloudinaryApiKey: string = process.env.CLOUDINARY_API_KEY || "";

if (!secretKey || !mongodbUri || !mongodbUsername || !mongodbPassword) {
  throw new Error("Missing required environment variables.");
}

// for proper functioning of mongodbUri
export const mainMongodbUri = mongodbUri
  .replace("username", mongodbUsername)
  .replace("password", mongodbPassword);
