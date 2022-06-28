import mongoose from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  createdAt: number;
  roles: mongoose.Schema.Types.ObjectId[];
}

interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  createdAt: number;
  roles: mongoose.Schema.Types.ObjectId[];
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Number, required: true },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

User.build({
  username: "cunt",
  email: "as;oigns@oasdg.b",
  password: "asdf",
  createdAt: Date.now(),
  roles: [],
});

export default { User };
