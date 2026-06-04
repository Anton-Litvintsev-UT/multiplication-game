import { Table, ConfigProvider, theme as antTheme } from "antd";
import { useEffect, useState } from "react";
import FooterNavigation from "../components/FooterNavigation";
import { useTranslation } from "react-i18next";
import { recordsTableColumns } from "../defaults/constants";

// dummy values for testing
const dataSource = [
	{
		key: "1",
		rank: 1,
		name: "Mike",
		difficulty: 3,
		correct: 32,
		incorect: 1,
		points: 100,
	},
	{
		key: "2",
		rank: 2,
		name: "Sarah",
		difficulty: 4,
		correct: 29,
		incorect: 3,
		points: 95,
	},
	{
		key: "3",
		rank: 3,
		name: "John",
		difficulty: 2,
		correct: 27,
		incorect: 2,
		points: 90,
	},
	{
		key: "4",
		rank: 4,
		name: "Emma",
		difficulty: 5,
		correct: 25,
		incorect: 4,
		points: 88,
	},
	{
		key: "5",
		rank: 5,
		name: "David",
		difficulty: 3,
		correct: 24,
		incorect: 5,
		points: 84,
	},
	{
		key: "6",
		rank: 6,
		name: "Olivia",
		difficulty: 4,
		correct: 22,
		incorect: 3,
		points: 80,
	},
	{
		key: "7",
		rank: 7,
		name: "James",
		difficulty: 2,
		correct: 21,
		incorect: 6,
		points: 76,
	},
	{
		key: "8",
		rank: 8,
		name: "Sophia",
		difficulty: 5,
		correct: 19,
		incorect: 4,
		points: 72,
	},
	{
		key: "9",
		rank: 9,
		name: "Daniel",
		difficulty: 3,
		correct: 18,
		incorect: 7,
		points: 68,
	},
	{
		key: "10",
		rank: 10,
		name: "Isabella",
		difficulty: 4,
		correct: 16,
		incorect: 5,
		points: 64,
	},
];

export default function RecordsPage() {
	const { t } = useTranslation();
	const [currentTheme] = useState(
		() => localStorage.getItem("theme") || "light",
	);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", currentTheme === "dark");
		document.documentElement.style.colorScheme = currentTheme;
	}, [currentTheme]);

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
				/>
				<FooterNavigation />
			</div>
		</ConfigProvider>
	);
}
