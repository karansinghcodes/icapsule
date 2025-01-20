import { Request, Response } from "express";
import { userModel } from "../models/user";
import { signupSchema } from "../schemas/signUpSchema";
import bcrypt from "bcryptjs";
import { saltRounds } from "../helpers/config";

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const requestvalidation = signupSchema.safeParse(user);

    if (requestvalidation.success) {
      const userExist = await userModel.findOne({ email: user.email });
      if (!userExist) {
        const hashedPassword = await bcrypt.hash(
          user.password,
          saltRounds
        );
        user.password = hashedPassword;

        const newUser = new userModel(user);
        await newUser.save();

        res
          .status(201)
          .json({ success: true, message: "User registered successfully" });
      } else {
        res.status(203).json({
          success: false,
          message: "User already registered with this email",
        });
      }
    } else {
      res.status(500).json({ success: false, message: "Invalid data sent" });
    }
  } catch (error) {
    console.error("error registering user", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
