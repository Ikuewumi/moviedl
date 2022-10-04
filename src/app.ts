import dotenv from "dotenv";
import { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import express from "express";
// import cors from "cors";
import mongoose from "mongoose";
const morgan = require("morgan");
const cors = require("cors");
import api from "./routes";
import { verify } from "./controllers/auth";
dotenv.config();

const app: Application = express();

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json({
   limit: '500kb'
}));
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
   
   res.json({
      msg: "works",
   });
});

app.use("/api", api);

const port = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URI!).then(() => app.listen(port));
