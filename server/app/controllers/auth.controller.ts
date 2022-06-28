import { Request, Response } from "express";

interface AuthInterface {
  signup(req: Request, res: Response): Promise<void>;
  signin(req: Request, res: Response): Promise<void>;
  signout(req: Request, res: Response): Promise<void>;
}

class AuthController implements AuthInterface {
  constructor() {}

  signup = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "This is the signup route!" });
  };

  signin = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "This is the signin route!" });
  };

  signout = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "This is the signout route!" });
  };
}

export default AuthController;
