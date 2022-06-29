import User from "../models/user.model";
import Role from "../models/role.model";
import { Request, Response, NextFunction } from "express";

const ROLES = ["user", "admin", "moderator"];

export const checkRolesExisted = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        console.log(`Failed! Role ${req.body.roles[i]} does not exist!`);

        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};

export const checkDuplicateUsernameOrEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email } = req.body;
  // Username
  User.findOne({
    username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};
