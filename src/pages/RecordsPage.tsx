import { Table, ConfigProvider, theme as antTheme } from "antd";
import { useEffect, useState } from "react";
import FooterNavigation from "../components/FooterNavigation";
import { useTranslation } from "react-i18next";
import { recordsTableColumns } from "../defaults/constants";

export default function RecordsPage() {
	const { t } = useTranslation();
	const [currentTheme] = useState(
		() => localStorage.getItem("theme") || "light",
	);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", currentTheme === "dark");
		document.documentElement.style.colorScheme = currentTheme;
	}, [currentTheme]);

	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(false);

	// Fetch records from backend on component mount
	useEffect(() => {
		const fetchRecords = async () => {
			setLoading(true);
			try {
				const response = await fetch("http://localhost:8000/scores");
				if (!response.ok) throw new Error("Failed to fetch records");
				const data = await response.json();

				const formattedData = data.map((item: any, index: number) => ({
					key: item.id.toString(),
					rank: index + 1,
					name: item.name,
					difficulty: Number(item.game_score) / Number(item.correct_count),
					correct: item.correct_count,
					incorect: item.asked_count - item.correct_count,
					points: item.game_score,
				}));

				setDataSource(formattedData);
			} catch (error) {
				console.error("Error fetching records:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchRecords();
	}, []);

	const recordsTableColumnsTranslated = recordsTableColumns.map(
		(item: any) => ({ ...item, title: t(item.title) }),
	);
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
				<Table
					dataSource={dataSource}
					columns={recordsTableColumnsTranslated}
					loading={loading}
				/>
				<FooterNavigation />
			</div>
		</ConfigProvider>
	);
}
