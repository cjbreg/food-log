import { Types, Schema, Document, model } from "mongoose";
import { IIngredient, IngredientSchema } from "./ingredient.model";

export interface IRecipe extends Document {
  user: Types.ObjectId;
  name: string;
  originalSource: string;
  ingredients: IIngredient[];
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
    },
  ],
  createdAt: { type: Date, required: true },
});

export default model<IRecipe>("Recipe", RecipeSchema);
