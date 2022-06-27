const express = require("express");
const router = express.Router();

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

router.use("/api/test/user", (req, res, next) => {
  authJwt.verifyToken(req, res, next);
  next();
});

router.use("/api/test/mod", (req, res, next) => {
  authJwt.verifyToken(req, res, next);
  authJwt.isModerator(req, res, next);
  next();
});

router.use("/api/test/admin", (req, res, next) => {
  authJwt.verifyToken(req, res, next);
  authJwt.isAdmin(req, res, next);
  next();
});

router.get("/api/test/all", (req, res) => {
  controller.allAccess(req, res);
});

router.get("/api/test/user", (req, res) => {
  controller.userBoard(req, res);
});

router.get("/api/test/mod", (req, res) => {
  controller.moderatorBoard(req, res);
});

router.get("/api/test/admin", (req, res) => {
  controller.adminBoard(req, res);
});

module.exports = router;
