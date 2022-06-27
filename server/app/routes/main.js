const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

recordRoutes.route("/").get(function (req, res) {
  res.send("hello world");
});

module.exports = recordRoutes;
