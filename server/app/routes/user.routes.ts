import express, { Request, Response } from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();
const controller = new UserController();

router.get("/user", async (req: Request, res: Response) => {
  try {
    controller.fetchAll(req, res);
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
