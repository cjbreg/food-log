import { Types, Schema, Document, model } from "mongoose";

export interface IStep extends Document {
  recipe: Types.ObjectId[];
  title: string;
  content: string;
  orderNumber: string;
}

export const StepSchema: Schema = new Schema({
  recipe: {
    type: Types.ObjectId,
    ref: "Recipe",
  },
  title: { type: String, required: false },
  content: { type: String, required: true },
  orderNumber: { type: Number, required: true },
});

export default model<IStep>("Step", StepSchema);
