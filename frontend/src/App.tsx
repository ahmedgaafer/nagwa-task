import React, { useEffect, useState } from "react";
import links from "./constants/links.json";
import {
	questionsAtom,
	answeredQuestionsAtom,
	showResultAtom,
	snackAtom,
} from "./Pages/atoms";
import { useAtom } from "jotai";
import Rank from "./Pages/Rank";
import "./App.css";
import Practice from "./Pages/Practice";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
	const [questions, setQuestions] = useAtom(questionsAtom);
	const [answeredQuestions, setAnsweredQuestions] = useAtom(
		answeredQuestionsAtom,
	);
	const [showResult, setShowResult] = useAtom(showResultAtom);
	const [snack, setSnack] = useAtom(snackAtom);

	useEffect(() => {
		fetch(links.wordsURL, {
			mode: "cors",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((res) => res.json())
			.then((res) => setQuestions(res.questions))
			.catch(() => {
				setSnack({
					open: true,
					message: "Error while fetching questions",
					severity: "error",
				});
			});
	}, []);

	const handleSnackClose = () => {
		setSnack({
			...snack,
			open: false,
		});
	};
	return (
		<div className="App">
			{showResult ? (
				<Rank />
			) : (
				questions.length && <Practice questions={questions} />
			)}

			<Snackbar
				open={snack.open}
				onClose={handleSnackClose}
				autoHideDuration={3000}
			>
				<Alert
					severity={snack.severity as AlertColor}
					onClose={handleSnackClose}
				>
					{snack.message}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default App;
