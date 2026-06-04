import { Button, Progress, ConfigProvider, theme as antTheme } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../defaults/constants";
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

const generateAnswerArray = (factor1: number, factor2: number): number[] => {
	const correctAnswer = factor1 * factor2;
	return [correctAnswer, 55, 66, 77];
};

export default function GamePage() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const difficultyLvl = Number(localStorage.getItem("lvl"));
	const isEffectRan = useRef(false);

	const [factor1, setFactor1] = useState(2);
	const [factor2, setFactor2] = useState(2);

	const [showAnswer, setShowAnswer] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
	const [correctAnswer, setCorrectAnswer] = useState<number>(0);

	const answers = generateAnswerArray(factor1, factor2);
	const [progressPercent, setProgressPercent] = useState<number>(100);

	const currentTheme = localStorage.getItem("theme")!; // always on first start light theme is added to local storage

	const onAnswerSelect = (answer: number) => {
		if (!showAnswer) {
			// do not allow to select answer when results are shown
			setShowAnswer(true);
			setSelectedAnswer(answer);
		}
	};

	useEffect(() => {
		const isDark = currentTheme === "dark";
		document.documentElement.classList.toggle("dark", isDark);
		document.documentElement.style.colorScheme = currentTheme;
	}, []);

	useEffect(() => {
		setCorrectAnswer(factor1 * factor2);
	}, [factor1, factor2]);

	useEffect(() => {
		if (!showAnswer) return;

		// TODO: If answer is correct have smaller delay, otherwise delay should be penalty
		const timer = setTimeout(() => {
			setShowAnswer(false);
			console.log("time to add points");
			console.log("hide answers");
		}, 1000);

		return () => clearTimeout(timer);
	}, [showAnswer]);

	useEffect(() => {
		if (isEffectRan.current) return; // avoid multiple number generations in dev mode
		isEffectRan.current = true;
		setFactor1(generateRandomNaturalNumber({ max: difficultyLvl }));
		setFactor2(generateRandomNaturalNumber({ max: difficultyLvl }));
	}, []);

	// Game loop
	useEffect(() => {
		// Start timer
		const startTime = Date.now();
		const totalTime = 60 * 1000;
		const fps = 8;
		const tickInterval = 1000 / fps;

		const interval = setInterval(() => {
			const elapsedTime = Date.now() - startTime;
			setProgressPercent(100 - (elapsedTime / totalTime) * 100); // show progress in reverse
			if (elapsedTime >= totalTime) {
				// stop progress bar
				clearInterval(interval);
			}
		}, tickInterval);
		return () => clearInterval(interval); // if component is destroyed before game ends
	}, []);

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
							<h3 className="dark:text-gray-300">{t("gamepage.score")}</h3>
							<h1 className="dark:text-white">
								{factor1}x{factor2}
							</h1>
						</div>
						<div>
							<h3 className="dark:text-gray-300">
								{t("gamepage.save_result")}
							</h3>
							<h1 className="dark:text-white">100</h1>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 w-full">
						{answers.map((answer, index) => (
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
