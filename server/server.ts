import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./app/routes";
import bodyParser from "body-parser";

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;
const mongoUrl = process.env.ATLAS_URI || "";

mongoose.connect(mongoUrl, {}).then(() => {
  const app: Express = express();
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());

  app.use("/api", routes);

  app.listen(port, () => {
    console.log("Server has started!");
    console.log(`Hosted on port ${port}`);
  });
});
