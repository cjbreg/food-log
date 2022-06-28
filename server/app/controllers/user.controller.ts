import { Request, Response } from "express";
import User from "../models/user.model";

interface UserInterface {
  fetchAll(req: Request, res: Response): Promise<void>;
  fetchById(req: Request, res: Response): Promise<void>;
  updateById(req: Request, res: Response): Promise<void>;
  deleteById(req: Request, res: Response): Promise<void>;
}

class UserController implements UserInterface {
  constructor() {}

  fetchAll = async (req: Request, res: Response): Promise<void> => {
    const users = await User.find({});
    res.status(200).send(users);
  };

  fetchById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.send(user);
    } catch (error) {
      res.status(404).send({ error: "User doesn't exist!" });
    }
  };

  updateById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (req.body.username) {
        user!.username = req.body.username;
      }

      await user!.save();
      res.send(user);
    } catch {
      res.status(404).send({ error: "User doesn't exist!" });
    }
  };

  deleteById = async (req: Request, res: Response): Promise<void> => {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } catch {
      res.status(404).send({ error: "User doesn't exist!" });
    }
  };
}

export default UserController;
