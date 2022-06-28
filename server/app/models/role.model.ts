import { Document, model, Schema } from "mongoose";

export interface IRole extends Document {
  name: string;
}

const roleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default model<IRole>("Role", roleSchema);
