export type Range = {
	min?: number;
	max: number;
};

export const getBackgroundColor = (
	showAnswers: boolean,
	answer: number,
	correct: number,
	selected: number,
): string | undefined => {
	if (!showAnswers) return;
	if (answer == correct) return "green";
	else if (answer == selected) return "red";
};

export const generateRandomNaturalNumber = ({ min = 2, max }: Range): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateAnswersArray = (correctAnswer: number): number[] => {
	const answers = new Set<number>();

	answers.add(correctAnswer);

	while (answers.size < 4) {
		const offset = Math.floor(Math.random() * 21) - 10;
		const distractor = correctAnswer + offset;

		if (distractor > 0 && distractor !== correctAnswer) {
			answers.add(distractor);
		}
	}

	return Array.from(answers).sort(() => Math.random() - 0.5);
};
