import type { MenuProps } from "antd";

export interface GameStats {
	gameScore: number;
	correctCount: number;
	askedCount: number;
}

export const paths = {
	INDEX: "/",
	GAME: "/game",
	RECORDS: "/records",
	RESULT: "/result",
	SETTINGS: "/settings",
};

export const languagesDropdown: MenuProps["items"] = [
	{
		key: "en",
		label: "languagesDropdown.en",
	},
	{
		key: "ru",
		label: "languagesDropdown.ru",
	},
	{
		key: "ee",
		label: "languagesDropdown.ee",
	},
];

export const themesDropdown: MenuProps["items"] = [
	{
		key: "light",
		label: "themesDropdown.light",
	},
	{
		key: "dark",
		label: "themesDropdown.dark",
	},
];

export const recordsTableColumns: {
	title: string;
	dataIndex: string;
	key: string;
}[] = [
	{
		title: "records.rank",
		dataIndex: "rank",
		key: "rank",
	},
	{
		title: "records.name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "records.difficulty",
		dataIndex: "difficulty",
		key: "difficulty",
	},
	{
		title: "records.correct",
		dataIndex: "correct",
		key: "correct",
	},
	{
		title: "records.incorrect",
		dataIndex: "incorect",
		key: "incorect",
	},
	{
		title: "records.points",
		dataIndex: "points",
		key: "points",
	},
];
