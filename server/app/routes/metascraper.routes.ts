import express, { Request, Response } from "express";
import MetascraperController from "../controllers/metascraper.controller";

const router = express.Router();
const controller = new MetascraperController();

router.use("/metascraper", (req, res, next) => {
  next();
});

// Get all recipes for user using Bearer token
router.get("/metascraper", async (req: Request, res: Response) => {
  try {
    controller.fetchData(req, res);
  } catch (error: any) {
    console.error(error.message);
  }
});

export default router;
