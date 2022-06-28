import mongoose from "mongoose";

interface IRole {
  name: string;
}

interface RoleDoc extends mongoose.Document {
  name: string;
}

interface RoleModelInterface extends mongoose.Model<RoleDoc> {
  build(attr: IRole): RoleDoc;
}

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

roleSchema.statics.build = (attr: IRole) => {
  return new Role(attr);
};

const Role = mongoose.model<RoleDoc, RoleModelInterface>("Role", roleSchema);

export default { Role };
