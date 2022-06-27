const express = require("express");
const router = express.Router();

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

router.get("/user", async (req, res) => {
  controller.fetchAll(req, res);
});

router.get("/user/:id", async (req, res) => {
  controller.fetchById(req, res);
});

router.put("/user/:id", async (req, res) => {
  controller.updateById(req, res);
});

router.delete("/user/:id", async (req, res) => {
  controller.deleteById(req, res);
});

module.exports = router;
