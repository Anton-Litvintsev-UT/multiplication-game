import { Table, ConfigProvider, theme as antTheme } from "antd";
import { useEffect, useState } from "react";
import FooterNavigation from "../components/FooterNavigation";
import { useTranslation } from "react-i18next";
import { recordsTableColumns } from "../defaults/constants";
import { formatRecords, type FormattedRecord } from "../utils/records";

export default function RecordsPage() {
	const { t } = useTranslation();
	const [currentTheme] = useState(
		() => localStorage.getItem("theme") || "light",
	);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", currentTheme === "dark");
		document.documentElement.style.colorScheme = currentTheme;
	}, [currentTheme]);

	const [dataSource, setDataSource] = useState<FormattedRecord[]>([]);
	const [loading, setLoading] = useState(false);

	// Fetch records from backend on component mount
	useEffect(() => {
		const fetchRecords = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/scores`);
				if (!response.ok) throw new Error("Failed to fetch records");
				const data = await response.json();

				setDataSource(formatRecords(data));
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
			<div className="flex flex-col items-center p-4 sm:p-8 pb-28 gap-6 min-h-dvh bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 transition-colors">
				<div className="w-full max-w-3xl">
					<Table
						dataSource={dataSource}
						columns={recordsTableColumnsTranslated}
						loading={loading}
						scroll={{ x: "max-content" }}
						pagination={{ responsive: true, defaultPageSize: 10 }}
						size="middle"
					/>
				</div>
				<FooterNavigation />
			</div>
		</ConfigProvider>
	);
}
