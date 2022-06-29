import express, { Request, Response } from "express";
import AuthController from "../controllers/auth.controller";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "../middleware/verifySignUp";

const router = express.Router();
const controller = new AuthController();

router.use("/api/auth", (req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

router.post(
  "/auth/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  async (req: Request, res: Response) => {
    try {
      controller.signup(req, res);
    } catch (error: any) {
      console.error(error.message);
    }
  }
);

router.post("/auth/signin", (req: Request, res: Response) => {
  try {
    controller.signin(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

router.post("/auth/signout", (req: Request, res: Response) => {
  try {
    controller.signout(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

export default router;
