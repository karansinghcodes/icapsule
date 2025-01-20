import mongoose from "mongoose";
import {  mainMongodbUri } from "../helpers/config";

export const Connection = async (username: string, password: string) => {
  try {

    await mongoose.connect(
    `${mainMongodbUri}`
    ,{dbName:"icapsule"});
    console.log("Datebase connected successfully");
  } catch (error) {
    console.error("error connecting database", error);
  }
};
