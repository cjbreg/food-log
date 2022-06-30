import express, { Request, Response } from "express";
import RecipeController from "../controllers/recipe.controller";
import { authenticateJWT } from "../middleware/authJwt";

const router = express.Router();
const controller = new RecipeController();

router.use("/recipe", authenticateJWT, (req, res, next) => {
  next();
});

// Get all recipes for user using Bearer token
router.get("/recipe", async (req: Request, res: Response) => {
  try {
    controller.fetchAll(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

// Get recipe by id
router.get("/recipe/:id", async (req: Request, res: Response) => {
  try {
    controller.fetchById(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

// Post new recipe
router.post("/recipe", async (req: Request, res: Response) => {
  try {
    controller.saveRecipe(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

// Update existing recipe
router.put("/recipe/:id", async (req: Request, res: Response) => {
  try {
    controller.updateRecipe(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

export default router;
