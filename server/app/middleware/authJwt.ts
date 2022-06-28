import jwt from "jsonwebtoken";
import config from "../config/auth.config";
import User from "../models/user.model";
import Role from "../models/role.model";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.body.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
