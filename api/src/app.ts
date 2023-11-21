import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser"
import { AppRouter } from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: '*' }));
// parsear el body de las requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.routes);

export default app;