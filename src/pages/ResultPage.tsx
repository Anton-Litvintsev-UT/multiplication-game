import { useEffect, useState } from "react";
import { paths, type GameStats } from "../defaults/constants";
import { useNavigate } from "react-router-dom";
import { Button, ConfigProvider, theme as antTheme, Input } from "antd";
import FooterNavigation from "../components/FooterNavigation";
import { useTranslation } from "react-i18next";

interface Props {
	gameStats: GameStats | undefined;
}

export default function ResultPage({ gameStats }: Props) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [showResultBtn, setShowResultBtn] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const currentTheme = localStorage.getItem("theme")!;
	const [playerName, setPlayerName] = useState(
		localStorage.getItem("player_name") || "",
	);

	useEffect(() => {
		if (typeof gameStats == "undefined") {
			navigate(paths.INDEX);
		}
	}, []);

	const onResultSave = async () => {
		setIsSaving(true);
		localStorage.setItem("player_name", playerName);

		try {
			const response = await fetch("http://localhost:8000/scores", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: playerName,
					gameScore: gameStats?.gameScore,
					correctCount: gameStats?.correctCount,
					askedCount: gameStats?.askedCount,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save score");
			}

			setShowResultBtn(true);
		} catch (error) {
			console.error("Error saving result:", error);
		} finally {
			setIsSaving(false);
		}
	};

	if (typeof gameStats == "undefined") return null;

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
				<div className="flex flex-col items-center p-8 gap-6 bg-gray-400 dark:bg-slate-700 min-w-[300px] rounded-lg shadow-xl">
					<Button
						size="large"
						className="text-center w-full"
						onClick={() => navigate(paths.GAME)}
					>
						{t("result.start_game")}
					</Button>
					<div className="flex w-full flex-row justify-between gap-4">
						<div>
							<h3 className="text-slate-800 dark:text-gray-300">
								{t("result.answer_accuracy")}
							</h3>
							<h1 className="text-slate-900 dark:text-white text-2xl font-bold">
								{gameStats.correctCount} / {gameStats.askedCount}
							</h1>
						</div>
						<div>
							<h3 className="text-slate-800 dark:text-gray-300">
								{t("gamepage.score")}
							</h3>
							<h1 className="text-slate-900 dark:text-white text-2xl font-bold text-right">
								{gameStats.gameScore}
							</h1>
						</div>
					</div>

					{showResultBtn ? (
						<Button
							type="primary"
							size="large"
							className="text-center w-full font-bold"
							onClick={() => navigate(paths.RECORDS)}
						>
							{t("result.navigate_to_records")}
						</Button>
					) : (
						<>
							<div className="flex flex-col gap-2 w-full">
								<Input
									size="large"
									placeholder={t("result.player_name")}
									onChange={(e) => setPlayerName(e.target.value)}
									value={playerName}
									disabled={isSaving}
								/>
							</div>
							<Button
								type="primary"
								size="large"
								className="text-center w-full font-bold"
								onClick={() => onResultSave()}
								loading={isSaving}
							>
								{t("result.save_score")}
							</Button>
						</>
					)}
				</div>
				<FooterNavigation />
			</div>
		</ConfigProvider>
	);
}
