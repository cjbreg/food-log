import express, { Request, Response } from "express";
import UserController from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/authJwt";

const router = express.Router();
const controller = new UserController();

router.get("/user", authenticateJWT, async (req: Request, res: Response) => {
  try {
    controller.fetchUser(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    controller.fetchById(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

router.put("/user/:id", async (req: Request, res: Response) => {
  try {
    controller.updateById(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

router.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    controller.deleteById(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

export default router;
