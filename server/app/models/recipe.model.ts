import { Types, Schema, Document, model } from "mongoose";
import { IIngredient, IngredientSchema } from "./ingredient.model";
import { IStep, StepSchema } from "./step.model";

export interface IRecipe extends Document {
  user: Types.ObjectId;
  name: string;
  originalSource: string;
  ingredients: IIngredient[];
  steps: IStep[];
  createdAt: Date;
}

const RecipeSchema: Schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  originalSource: { type: String, required: true },
  ingredients: [
    {
      type: IngredientSchema,
      required: false,
    },
  ],
  steps: [
    {
      type: StepSchema,
      required: false,
    },
  ],
  createdAt: { type: Date, required: true },
});

export default model<IRecipe>("Recipe", RecipeSchema);
