import express, { Request, Response } from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();
const controller = new UserController();

router.get("/user", async (req: Request, res: Response) => {
  controller.fetchAll(req, res);
});

router.get("/user/:id", async (req: Request, res: Response) => {
  controller.fetchById(req, res);
});

router.put("/user/:id", async (req: Request, res: Response) => {
  controller.updateById(req, res);
});

router.delete("/user/:id", async (req: Request, res: Response) => {
  controller.deleteById(req, res);
});

export default router;
