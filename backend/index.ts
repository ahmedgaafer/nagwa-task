import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import wordsRouter from './words';
import rankRouter from "./rank";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
/* Settings */
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(cors());

/* Routes */
app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.use("/words", wordsRouter);
app.use("/rank", rankRouter);

app.get("*", (req: Request, res: Response) => {
	res.status(404).send({ msg: "route not found" });
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
