import { Application } from "express";
import express from "express";
import router from "./Routes/route";
import bodyParser from "body-parser";
import cors from "cors";
import { Connection } from "./db/db";
import {
  mongodbUsername,
  mongodbPassword,
  portNumber,
} from "./helpers/config";

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

Connection(mongodbUsername, mongodbPassword);

app.use("/icapsule", router);

app.listen(portNumber, () => {
  console.log(`server started running on port ${portNumber}`);
});
