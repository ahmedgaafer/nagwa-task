import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import wordsRouter from './words';
import rankRouter from "./rank";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.use("/words", wordsRouter);
app.use("/rank", rankRouter)


app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
