import { Request, Response } from "express";
import { createCapsuleSchema } from "../schemas/createCapsule";
import { userModel } from "../models/user";
import { capsuleModel } from "../models/capsule";
import { JwtPayload } from "jsonwebtoken";

export interface RequestWithUser extends Request {
  userEmail: string | JwtPayload;
}

export const createCapsule = async (req: RequestWithUser, res: Response) => {
  try {
    const capsule = req.body;
    const requestValidation = createCapsuleSchema.safeParse(capsule);

    if (requestValidation.success) {
      const user = await userModel.findOne({ email: req.userEmail });
      if (!user) {
        res.status(500).json({
          success: false,
          message: "Invalid token or user does not exist",
        });
      } else {
        capsule.owner = user._id;

        const newCapsule = new capsuleModel(capsule);
        await newCapsule.save();

        res
          .status(200)
          .json({ success: true, message: "capsule created successfully" });
      }
    }
  } catch (error) {
    console.error("error creating capsule", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
