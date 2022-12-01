import { useAtom } from "jotai";
import { useState } from "react";
import {
	question,
	answeredQuestionsAtom,
	showResultAtom,
	snackAtom,
	scoreAtom,
} from "./atoms";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Button, CardActions } from "@mui/material";

type PracticeProps = {
	questions: question[];
};

const Practice = (props: PracticeProps): JSX.Element => {
	const [answeredQuestions, setAnsweredQuestions] = useAtom(
		answeredQuestionsAtom,
	);
	const [showResult, setShowResult] = useAtom(showResultAtom);
	const [score, setScore] = useAtom(scoreAtom);
	const { questions } = props;
	const [step, setStep] = useState(0);
	const [snack, setSnack] = useAtom(snackAtom);

	const buttons = ["adverb", "noun", "verb", "adjective"];

	const handleAnswerClick = (ans: string, step: number) => {
		const current: string[] = [...answeredQuestions];
		const currentAns = current[step]?.length > 0 ? "" : ans;
		current[step] = currentAns;
		setAnsweredQuestions(current);
		currentAns.length > 0 &&
			setStep(step === questions.length - 1 ? questions.length - 1 : step + 1);
	};

	const handleSubmitForm = () => {
		const isAll = answeredQuestions.filter((q) => q?.length).length === 10;

		if (!isAll) {
			setSnack({
				open: true,
				message: "Please answer all the questions first",
				severity: "warning",
			});
			return;
		}

		const result =
			questions.reduce(
				(acc, v, ind) => (acc += v.pos === answeredQuestions[ind] ? 1 : 0),
				0,
			) / questions.length;

		setScore(result * 100);
		setShowResult(true);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={step}>
				{questions.map((label, i) => (
					<Step
						key={label.id}
						onClick={() => setStep(i)}
						id="step"
						style={{
							transform: i === step ? "scale(1.5)" : "",
							marginLeft: i === step ? 10 : 0,
						}}
						completed={answeredQuestions[i]?.length > 0}
					>
						<StepLabel />
					</Step>
				))}
			</Stepper>

			<Card
				sx={{
					maxWidth: 345,
					margin: 20,
					background: "#2a2a2a",
					color: "whitesmoke",
				}}
				elevation={5}
			>
				<CardContent>
					<Typography gutterBottom variant="h6" component="div">
						Question: {step + 1}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						style={{ color: "whitesmoke", fontSize: 24 }}
					>
						{questions[step].word}
					</Typography>
				</CardContent>
				<CardActions>
					{buttons.map((btn) => (
						<Button
							key={btn}
							onClick={() => handleAnswerClick(btn, step)}
							variant={
								answeredQuestions[step] === btn ? "contained" : "outlined"
							}
						>
							{btn}{" "}
						</Button>
					))}
				</CardActions>
			</Card>

			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				<Button
					variant="contained"
					onClick={() => setStep(step === 0 ? 0 : step - 1)}
				>
					Previous Question
				</Button>

				{answeredQuestions.every((q) => q.length > 0) && (
					<Button
						variant="contained"
						color="success"
						onClick={handleSubmitForm}
					>
						Show results
					</Button>
				)}
				<Button
					variant="contained"
					onClick={() =>
						setStep(
							step === questions.length - 1 ? questions.length - 1 : step + 1,
						)
					}
				>
					Next Question
				</Button>
			</Box>
		</Box>
	);
};

export default Practice;
