import { Types, Schema, Document, model } from "mongoose";

export interface IRecipe extends Document {
  userId: Types.ObjectId[];
  name: string;
  originalSource: string;
  createdAt: Date;
}

const RecipeSchema: Schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  originalSource: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export default model<IRecipe>("Recipe", RecipeSchema);
