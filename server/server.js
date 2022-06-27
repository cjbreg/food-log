const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const mongoUrl = process.env.ATLAS_URI;

const routes = require("./app/routes"); //

mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api", routes);

  app.listen(port, () => {
    console.log("Server has started!");
    console.log(`Hosted on port ${port}`);
  });
});
