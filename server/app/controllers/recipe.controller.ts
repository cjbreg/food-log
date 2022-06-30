import { Request, Response } from "express";
import { userInfo } from "os";
import Ingredient, { IngredientSchema } from "../models/ingredient.model";
import Recipe from "../models/recipe.model";

interface RecipeInterface {
  fetchAll(req: Request, res: Response): Promise<void>;
  fetchById(req: Request, res: Response): Promise<void>;
  saveRecipe(req: Request, res: Response): Promise<void>;
  updateRecipe(req: Request, res: Response): Promise<void>;
  updateRecipe(req: Request, res: Response): Promise<void>;
}

class RecipeController implements RecipeInterface {
  constructor() {}

  fetchAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user } = req.body;

      const recipes = await Recipe.find({ userId: user.id });
      res.status(200).send({ data: recipes });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, try again later." });
    }
  };

  fetchById = async (req: Request, res: Response): Promise<void> => {
    try {
      const recipe = await Recipe.findById(req.params.id).populate("user");
      if (!recipe) throw new Error();
      res.send({ data: recipe });
    } catch (error: any) {
      res.status(404).send({ error: "Recipe doesn't exist!" });
    }
  };

  saveRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
      const recipe = new Recipe({
        user: req.body.user.id,
        name: req.body.name,
        originalSource: req.body.originalSource,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        createdAt: Date.now(),
      });

      recipe.save((err, recipe) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({
          message: "Recipe was registered successfully!",
          data: recipe,
        });
      });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, try again later." });
    }
  };

  updateRecipe = async (req: Request, res: Response) => {
    try {
      const recipeId = req.params.id;

      // Update Recipe
      await Recipe.findByIdAndUpdate(recipeId, {
        name: req.body.name,
      });

      // Return updated Recipe
      const recipe = await Recipe.findById(req.params.id).populate("user");
      if (!recipe) throw new Error();
      res.send({ message: "Recipe was successfully updated", data: recipe });
    } catch (error) {
      res.status(404).send({ error: "Recipe doesn't exist!" });
    }
  };

  deleteRecipe = async (req: Request, res: Response) => {};
}

export default RecipeController;
