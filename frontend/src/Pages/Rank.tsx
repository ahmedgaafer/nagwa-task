import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import links from "../constants/links.json";
import {
	answeredQuestionsAtom,
	questionsAtom,
	scoreAtom,
	showResultAtom,
} from "./atoms";

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";

type RankProps = {};
const Rank = (props: RankProps): JSX.Element => {
	const [score] = useAtom(scoreAtom);
	const [, setAnsweredQuestions] = useAtom(answeredQuestionsAtom);
	const [, setQuestions] = useAtom(questionsAtom);

	const [, setShowResult] = useAtom(showResultAtom);

	const [rank, setRank] = useState(0);

	useEffect(() => {
		fetch(links.rankURL, {
			method: "POST",
			body: JSON.stringify({
				score,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				setRank(res.rank);
			});
	}, [score]);

	const handleClick = () => {
		setAnsweredQuestions([]);
		fetch(links.wordsURL)
			.then((res) => res.json())
			.then((res) => {
				setQuestions(res.questions);
			});

		setShowResult(false);
	};

	return (
		<>
			Your rating is: {rank} %
			<br />
			<Rating
				name="text-feedback"
				value={rank / 20}
				readOnly
				precision={0.5}
				emptyIcon={<StarIcon style={{ opacity: 0.9 }} fontSize="inherit" />}
			/>
			<br />
			<Button variant="contained" onClick={handleClick}>
				Try Again
			</Button>
		</>
	);
};

export default Rank;
