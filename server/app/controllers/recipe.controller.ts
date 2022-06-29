import { Request, Response } from "express";
import Recipe from "../models/recipe.model";

interface RecipeInterface {
  fetchAll(req: Request, res: Response): Promise<void>;
  fetchById(req: Request, res: Response): Promise<void>;
  saveRecipe(req: Request, res: Response): Promise<void>;
}

class RecipeController implements RecipeInterface {
  constructor() {}

  fetchAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user } = req.body;

      const recipes = await Recipe.find({ userId: user.id });
      res.status(200).send(recipes);
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, try again later." });
    }
  };

  fetchById = async (req: Request, res: Response): Promise<void> => {
    try {
      const recipe = await Recipe.findById(req.params.id).populate("user");
      if (!recipe) throw new Error();
      res.send(recipe);
    } catch (error: any) {
      res.status(404).send({ error: "Recipe doesn't exist!" });
    }
  };

  saveRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user } = req.body;

      const recipe = new Recipe({
        user: user.id,
        name: req.body.name,
        originalSource: req.body.originalSource,
        createdAt: Date.now(),
      });

      recipe.save((err, recipe) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({
          message: `Recipe ${recipe.name} was registered successfully!`,
        });
      });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, try again later." });
    }
  };
}

export default RecipeController;
