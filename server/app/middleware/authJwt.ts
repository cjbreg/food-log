import jwt from "jsonwebtoken";
import config from "../config/auth.config";
import User from "../models/user.model";
import Role from "../models/role.model";
import { Request, Response, NextFunction } from "express";

// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   let token = req.beare;
//   if (!token) {
//     return res.status(403).send({ message: "No token provided!" });
//   }

//   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: "Unauthorized!" });
//     }
//     req.body.userId = decoded.id;
//     next();
//   });
// };

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

// const authJwt = {
//   verifyToken,
// };
// module.exports = authJwt;
