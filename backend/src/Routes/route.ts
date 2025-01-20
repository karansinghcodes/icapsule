import { Router } from "express";
import { signUp } from "../controller/signUp";
import express from "express";
import { login } from "../controller/login";
import { uploadFile } from "../controller/uploadFile";
import { upload } from "../middleware/multer.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router: Router = express.Router();

//signup and login
router.post("/sign-up", signUp);
router.post("/login", login);

//upload file
router.post(
  "/upload",
  authenticate as express.RequestHandler,
  upload.single("file"),
  uploadFile
);

export default router;
