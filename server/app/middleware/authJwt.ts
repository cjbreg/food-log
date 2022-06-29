import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.SECRET_KEY || "";

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.body.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
