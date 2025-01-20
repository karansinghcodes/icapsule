import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../controller/createCapsule";
import { secretKey } from "../helpers/config";

export const authenticate = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.header("Authorization");
  const token = authHeaders?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token is required.", success: false });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userEmail = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token.", success: false });
  }
};
