import { Button, Progress, ConfigProvider, theme as antTheme } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths, type GameStats } from "../defaults/constants";
import FooterNavigation from "../components/FooterNavigation";
import { useTranslation } from "react-i18next";
import {
	generateAnswersArray,
	generateRandomNaturalNumber,
	getBackgroundColor,
} from "../utils/game";

type GamePageProps = {
	setGameStats: (stats: GameStats) => void;
};

export default function GamePage({ setGameStats }: GamePageProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const difficultyLvl = Number(localStorage.getItem("lvl"));
	const isEffectRan = useRef(false);

	const [factor1, setFactor1] = useState(2);
	const [factor2, setFactor2] = useState(2);

	const [showAnswer, setShowAnswer] = useState(false);
	const [gameFinished, setGameFinished] = useState(false);

	const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
	const [correctAnswer, setCorrectAnswer] = useState<number>(0);
	const [answersArray, setAnswersArray] = useState<number[]>([]);
	const [gameScore, setGameScore] = useState(0);
	const [askedCount, setAskedCount] = useState(0);
	const [correctCount, setCorrectCount] = useState(0);

	const [progressPercent, setProgressPercent] = useState<number>(100);
	const gameStateRef = useRef({ gameScore, correctCount, askedCount });

	const currentTheme = localStorage.getItem("theme")!; // always on first start light theme is added to local storage

	const updateTask = () => {
		setFactor1(generateRandomNaturalNumber({ max: difficultyLvl }));
		setFactor2(generateRandomNaturalNumber({ max: difficultyLvl }));
	};

	// progress bar is responsible for game end
	const initProgressBar = () => {
		// Start timer
		const gameStartTime = Date.now();
		const gameTotalTime = Number(localStorage.getItem("game_duration"));
		const progressBarFPS = 8;
		const progressBarUpdateInterval = 1000 / progressBarFPS;

		const intervalObject = setInterval(() => {
			const elapsedTime = Date.now() - gameStartTime;
			setProgressPercent(
				Math.max(0, 100 - (elapsedTime / gameTotalTime) * 100),
			); // show progress in reverse
			if (elapsedTime >= gameTotalTime) {
				// stop progress bar
				clearInterval(intervalObject);
			}
		}, progressBarUpdateInterval);
		return () => clearInterval(intervalObject); // if component is destroyed before game ends
	};

	const initTheme = () => {
		const isDark = currentTheme === "dark";
		document.documentElement.classList.toggle("dark", isDark);
		document.documentElement.style.colorScheme = currentTheme;
	};

	const onAnswerSelect = (answer: number) => {
		// do not allow to select answer when results are shown
		if (!showAnswer) {
			setShowAnswer(true);
			setSelectedAnswer(answer);
		}
	};

	useEffect(() => {
		// avoid multiple number generations in dev mode
		if (isEffectRan.current) return;
		isEffectRan.current = true;

		initProgressBar();
		initTheme();
		updateTask();
	}, []);

	// if progress bar is at 0 finish game
	useEffect(() => {
		if (progressPercent == 0) {
			setGameFinished(true);
		}
	}, [progressPercent]);

	// use hook useRef to update values for game results
	useEffect(() => {
		if (!gameFinished) return;
		setGameStats(gameStateRef.current);
		navigate(paths.RESULT);
	}, [gameFinished]);

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
			delay = 0.3 * 1000;
			setGameScore(gameScore + difficultyLvl);
			setCorrectCount(correctCount + 1);
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
			<div className="flex flex-col items-center justify-center p-4 sm:p-8 pb-28 gap-6 min-h-dvh bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 transition-colors">
				<div className="flex flex-col items-center p-5 sm:p-8 gap-6 bg-gray-200 dark:bg-slate-700 w-full max-w-md rounded-xl shadow-xl">
					<Button
						block
						className="text-center"
						onClick={() => navigate(paths.INDEX)}
					>
						{t("gamepage.end_game")}
					</Button>
					<Progress
						className="w-full"
						percent={progressPercent}
						showInfo={false}
						success={{
							percent: 0,
						}}
					/>
					<div className="flex w-full flex-row justify-between gap-4">
						<div>
							<h3 className="text-sm text-slate-700 dark:text-gray-300">
								{t("gamepage.next_task")}
							</h3>
							<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
								{factor1}x{factor2}
							</h1>
						</div>
						<div className="text-right">
							<h3 className="text-sm text-slate-700 dark:text-gray-300">
								{t("gamepage.score")}
							</h3>
							<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
								{gameScore}
							</h1>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
						{answersArray.map((answer, index) => {
							const btnBackground = getBackgroundColor(
								showAnswer,
								answer,
								correctAnswer,
								selectedAnswer,
							);
							return (
								<Button
									key={`${index} ${btnBackground}`}
									className="w-full"
									style={{
										height: "auto",
										aspectRatio: "1 / 1",
										fontSize: "clamp(1.75rem, 12vw, 4rem)",
										fontWeight: 600,
										backgroundColor: `${btnBackground}`,
									}}
									onClick={() => onAnswerSelect(answer)}
								>
									{answer}
								</Button>
							);
						})}
					</div>
				</div>
				<FooterNavigation />
			</div>
		</ConfigProvider>
	);
}
