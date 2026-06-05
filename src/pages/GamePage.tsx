import { Button, Progress, ConfigProvider, theme as antTheme } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths, type GameStats } from "../defaults/constants";
import FooterNavigation from "../components/FooterNavigation";
import { useTranslation } from "react-i18next";

type Range = {
	min?: number;
	max: number;
};

const getBackgroundColor = (
	showAnswers: boolean,
	answer: number,
	correct: number,
	selected: number,
) => {
	if (!showAnswers) return;
	if (answer == correct) return "green";
	else if (answer == selected) return "red";
};

const generateRandomNaturalNumber = ({ min = 2, max }: Range): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// TODO: improve generation, make answers more similar to real one: factor1 + 1 or 2 * factor2, factor2 + 1 or 2 * factor1
const generateAnswersArray = (correctAnswer: number): number[] => {
	const answers = new Set<number>();

	// 1. Always add the correct answer
	answers.add(correctAnswer);

	// 2. Generate distractors until we have 4 total
	while (answers.size < 4) {
		// Create an offset between -10 and 10 (excluding 0)
		const offset = Math.floor(Math.random() * 21) - 10;
		const distractor = correctAnswer + offset;

		// Ensure distractor is a natural number and not the correct answer
		if (distractor > 0 && distractor !== correctAnswer) {
			answers.add(distractor);
		}
	}

	// 3. Convert to array and shuffle them
	// return Array.from(answers).sort(() => Math.random() - 0.5);
	return Array.from(answers);
};

interface GamePageProps {
	setGameStats: (stats: GameStats) => void;
}

export default function GamePage({ setGameStats }: GamePageProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const difficultyLvl = Number(localStorage.getItem("lvl"));
	const isEffectRan = useRef(false);

	const [factor1, setFactor1] = useState(2);
	const [factor2, setFactor2] = useState(2);

	const [showAnswer, setShowAnswer] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
	const [correctAnswer, setCorrectAnswer] = useState<number>(0);
	const [answersArray, setAnswersArray] = useState<number[]>([]);
	const [gameScore, setGameScore] = useState(0);
	const [askedCount, setAskedCount] = useState(0);
	const [correctCount, setCorrectCount] = useState(0);

	const [progressPercent, setProgressPercent] = useState<number>(100);
	const gameStateRef = useRef({ gameScore, correctCount, askedCount });

	const currentTheme = localStorage.getItem("theme")!; // always on first start light theme is added to local storage

	const onAnswerSelect = (answer: number) => {
		if (!showAnswer) {
			// do not allow to select answer when results are shown
			setShowAnswer(true);
			setSelectedAnswer(answer);
		}
	};

	const updateTask = () => {
		setFactor1(generateRandomNaturalNumber({ max: difficultyLvl }));
		setFactor2(generateRandomNaturalNumber({ max: difficultyLvl }));
	};

	// Progress bar
	useEffect(() => {
		// Start timer
		const gameStartTime = Date.now();
		const gameTotalTime = Number(localStorage.getItem("game_duration"));
		const progressBarFPS = 8;
		const progressBarUpdateInterval = 1000 / progressBarFPS;

		const intervalObject = setInterval(() => {
			const elapsedTime = Date.now() - gameStartTime;
			setProgressPercent(100 - (elapsedTime / gameTotalTime) * 100); // show progress in reverse
			if (elapsedTime >= gameTotalTime) {
				// stop progress bar
				clearInterval(intervalObject);

				// use hook useRef to update values for game results
				const { gameScore, correctCount, askedCount } = gameStateRef.current;
				setGameStats({ gameScore, correctCount, askedCount });
				navigate(paths.RESULT);
			}
		}, progressBarUpdateInterval);
		return () => clearInterval(intervalObject); // if component is destroyed before game ends
	}, []);

	useEffect(() => {
		const isDark = currentTheme === "dark";
		document.documentElement.classList.toggle("dark", isDark);
		document.documentElement.style.colorScheme = currentTheme;
	}, []);

	useEffect(() => {
		if (isEffectRan.current) return; // avoid multiple number generations in dev mode
		isEffectRan.current = true;
		updateTask();
	}, []);

	// Keep the ref updated whenever the state changes
	useEffect(() => {
		gameStateRef.current = { gameScore, correctCount, askedCount };
	}, [gameScore, correctCount, askedCount]);

	useEffect(() => {
		const answer = factor1 * factor2;
		setCorrectAnswer(answer);
		setAnswersArray(generateAnswersArray(answer));
	}, [factor1, factor2]);

	useEffect(() => {
		if (!showAnswer) return;

		setAskedCount(askedCount + 1);

		let delay;
		if (selectedAnswer == correctAnswer) {
			delay = 0;
			setGameScore(gameScore + difficultyLvl);
			setCorrectCount(askedCount + 1);
		} else {
			// add delay penalty if answer was wrong
			delay = 3 * 1000;
		}

		const timer = setTimeout(() => {
			setShowAnswer(false);
			updateTask();
		}, delay);

		return () => clearTimeout(timer);
	}, [showAnswer]);

	return (
		<ConfigProvider
			theme={{
				algorithm:
					currentTheme === "dark"
						? antTheme.darkAlgorithm
						: antTheme.defaultAlgorithm,
			}}
		>
			<div className="flex flex-col items-center p-8 gap-6 min-h-screen bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 transition-colors">
				<div className="flex flex-col items-center p-8 gap-6 bg-gray-400 dark:bg-slate-700 w-min rounded-lg shadow-xl">
					<Button className="text-center" onClick={() => navigate(paths.INDEX)}>
						{t("gamepage.end_game")}
					</Button>
					<Progress
						className="justify-center"
						percent={progressPercent}
						size={[400, 20]}
						showInfo={false}
						success={{
							percent: 0,
						}}
					/>
					<div className="flex w-full flex-row justify-between">
						<div>
							<h3 className="dark:text-gray-300">{t("gamepage.next_task")}</h3>
							<h1 className="dark:text-white">
								{factor1}x{factor2}
							</h1>
						</div>
						<div>
							<h3 className="dark:text-gray-300">{t("gamepage.score")}</h3>
							<h1 className="dark:text-white">{gameScore}</h1>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 w-full">
						{answersArray.map((answer, index) => (
							<Button
								key={`${index} ${getBackgroundColor(showAnswer, answer, correctAnswer, selectedAnswer)}`}
								className="w-full"
								style={{
									height: "auto",
									aspectRatio: "1 / 1",
									fontSize: "4rem",
									backgroundColor: `${getBackgroundColor(showAnswer, answer, correctAnswer, selectedAnswer)}`,
								}}
								onClick={() => onAnswerSelect(answer)}
							>
								{answer}
							</Button>
						))}
					</div>
				</div>
				<FooterNavigation />
			</div>
		</ConfigProvider>
	);
}
