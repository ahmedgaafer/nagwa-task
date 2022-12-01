import { atom } from "jotai";

export type question = {
	id: number;
	word: string;
	pos: string;
};

export const answeredQuestionsAtom = atom<string[]>([]);
export const questionsAtom = atom<question[]>([]);
export const showResultAtom = atom(false);
export const scoreAtom = atom(0);
export const snackAtom = atom({
	open: false,
	message: "success",
	severity: "success",
});
