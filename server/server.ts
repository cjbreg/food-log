import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;
const mongoUrl = process.env.ATLAS_URI || "";

const routes = require("./app/routes");

mongoose.connect(mongoUrl, {}).then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api", routes);

  app.listen(port, () => {
    console.log("Server has started!");
    console.log(`Hosted on port ${port}`);
  });
});
