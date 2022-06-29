import { Types, Schema, Document, model } from "mongoose";

export interface IRecipe extends Document {
  userId: Types.ObjectId[];
  name: string;
  originalSource: string;
}

const RecipeSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  originalSource: { type: String, required: true },
});

export default model<IRecipe>("Recipe", RecipeSchema);
