import express, { Express, Request, Response } from "express";
import DB from "../TestData.json";
const rankRouter = express.Router();

/**
 * Binary search to return the index that the new item should be inserted into
 * @param arr
 * @param val
 * @returns
 */
function binarySearch(A: number[], T: number): number {
	let N = A.length,
		i = 0,
		j = N;
	while (i < j) {
		let k = Math.floor((i + j) / 2);
		if (A[k] < T) i = k + 1;
		else j = k;
	}
	return i;
}

/**
 * Generate the current rank of the user given his test result
 */
rankRouter.post("/", (req: Request, res: Response) => {
	const { score } = req.body;

	const scores = DB.scoresList.sort((a, b) => a - b);
	const newIndex = binarySearch(scores, Number(score));
	const rank = Number(((newIndex / (scores.length - 1)) * 100).toFixed(2));

	res.status(202).send({ rank });
});

export default rankRouter;
