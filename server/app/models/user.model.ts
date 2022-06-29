import { Types, Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  roles: Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  roles: [
    {
      type: Types.ObjectId,
      ref: "Role",
    },
  ],
});

export default model<IUser>("User", UserSchema);
