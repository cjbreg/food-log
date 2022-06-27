const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");

router.use("/api/auth", (req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

router.post("/api/auth/signup", async (req, res) => {
  try {
    // res.json({ message: "This is the signup route!" });
    controller.signup(req, res);
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/api/auth/signin", (req, res) => {
  try {
    res.json({ message: "This is the signin route!" });
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/api/auth/signout", (req, res) => {
  try {
    res.json({ message: "This is the signout route!" });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
