import dotenv from "dotenv";
import { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
const cors = require("cors");
const morgan = require("morgan");
import api from "./routes";
import path from 'path'
dotenv.config();

const app: Application = express();
app.set('trust-proxy', 1)
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json({
   limit: '500kb'
}));

if (process.env.NODE_ENV !== 'production') {
   app.use(morgan('dev'))
}

app.use("/api", api);

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/dist'))

   app.get('*/*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
   })
}

const port = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URI!).then(() => app.listen(port));
