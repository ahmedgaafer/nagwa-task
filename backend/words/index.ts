import express, { Express, Request, Response } from "express";
import DB from "../TestData.json";
const wordsRouter = express.Router();

type question = {
	id: number;
	word: string;
	pos: string;
};

/**
 * generate random index from a given array length
 * @param len
 * @returns
 */
function randIndex(len: number): number {
	return Math.floor(Math.random() * len);
}

/**
 * Generate a set of 10 random questions that has at least the 4 unique types
 */
wordsRouter.get("/", (req: Request, res: Response) => {
	const words = DB.wordList;
	const questionsSet = new Set<string>();
	const questionsResponse: question[] = [];

	const numberOfQuestions = 10;
	const numberOfUniqueTypes = 4;

	while (true) {
		const word = words[randIndex(words.length)];
		if (questionsResponse.length === numberOfQuestions) break;
		if (questionsResponse.some((e) => e.id === word.id)) continue;
		if (questionsSet.size >= numberOfUniqueTypes) {
			questionsResponse.push(word);
			continue;
		}
		if (questionsSet.has(word.pos)) continue;
		questionsResponse.push(word);
		questionsSet.add(word.pos);
	}
	res.status(202).send({ questions: questionsResponse });
});

export default wordsRouter;
