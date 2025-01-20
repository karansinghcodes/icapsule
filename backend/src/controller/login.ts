import { Request, Response } from "express";
import { userModel } from "../models/user";
import { loginSchema } from "../schemas/loginSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretKey } from "../helpers/config";

export const login = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const requestvalidation = loginSchema.safeParse(user);

    if (requestvalidation.success) {
      const userExist = await userModel.findOne({
        email: user.email,
      });

      if (userExist) {
        const hashedPassword = userExist.password;
        const passwordMatched = bcrypt.compareSync(
          user.password,
          hashedPassword
        );
        if (passwordMatched) {
          const token = jwt.sign(user.email, secretKey as string);
          res.status(200).json({
            success: true,
            message: "Login successfull",
            token: token,
          });
        } else {
          res.status(203).json({ success: false, message: "Invalid Password" });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "User does not exist with this email",
        });
      }
    } else {
      res.status(500).json({ success: false, message: "Invalid data sent" });
    }
  } catch (error) {
    console.error("error registering user", error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};
