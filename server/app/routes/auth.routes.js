const express = require("express");
const router = express.Router();

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

router.use("/api/auth", (req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

// router.use("/api/auth/signup", (req, res, next) => {
//   verifySignUp.checkDuplicateUsernameOrEmail(req, res, next);
//   verifySignUp.checkRolesExisted(req, res, next);
//   next();
// });

router.post("/api/auth/signup", (req, res) => {
  // verifySignUp.checkDuplicateUsernameOrEmail(req, res);
  // verifySignUp.checkRolesExisted(req, res, next);
  controller.signup(req, res);
});

router.post("/api/auth/signin", (req, res) => {
  controller.signin(req, res);
});

router.post("/api/auth/signout", (req, res) => {
  controller.signup(req, res);
});

module.exports = router;
