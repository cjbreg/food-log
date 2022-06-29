import { Request, Response } from "express";
import User from "../models/user.model";
import Role, { IRole } from "../models/role.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface AuthInterface {
  signup(req: Request, res: Response): Promise<void>;
  signin(req: Request, res: Response): Promise<void>;
  signout(req: Request, res: Response): Promise<void>;
}

class AuthController implements AuthInterface {
  constructor() {}

  signup = async (req: Request, res: Response): Promise<void> => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      createdAt: Date.now(),
    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Role.findOne({ name: "user" }, (err: any, role: IRole) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    });
  };

  signin = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    await User.findOne({ username }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res
          .status(404)
          .send({ message: "Invalid Username or Password!" });
      }

      var passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ message: "Invalid Username or Password!" });
      }

      const secretKey = process.env.SECRET_KEY || "";

      var accessToken = jwt.sign(
        { id: user.id, username: user.username },
        secretKey
      );

      res.json({
        username,
        email: user.email,
        userID: user.id,
        accessToken,
      });
    });
  };

  signout = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send({ message: "You've been signed out!" });
    return;
  };
}

export default AuthController;
