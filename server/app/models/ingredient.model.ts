import { Types, Schema, Document, model } from "mongoose";

export interface IIngredient extends Document {
  recipe: Types.ObjectId[];
  name: string;
  amount: number;
  unit: string;
}

export const IngredientSchema: Schema = new Schema({
  recipe: {
    type: Types.ObjectId,
    ref: "Recipe",
  },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  unit: { type: String, required: false },
});

export default model<IIngredient>("Ingredient", IngredientSchema);
