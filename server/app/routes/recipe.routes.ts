import express, { Request, Response } from "express";
import RecipeController from "../controllers/recipe.controller";
import { authenticateJWT } from "../middleware/authJwt";

const router = express.Router();
const controller = new RecipeController();

router.use("/recipe", authenticateJWT, (req, res, next) => {
  next();
});

router.get("/recipe", async (req: Request, res: Response) => {
  try {
    controller.fetchAll(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

router.get("/recipe/:id", async (req: Request, res: Response) => {
  try {
    controller.fetchById(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

router.post("/recipe", async (req: Request, res: Response) => {
  try {
    controller.saveRecipe(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

export default router;
