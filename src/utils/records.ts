export interface RawScore {
	id: number | string;
	name: string;
	game_score: number | string;
	correct_count: number | string;
	asked_count: number | string;
}

export interface FormattedRecord {
	key: string;
	rank: number;
	name: string;
	difficulty: number;
	correct: number | string;
	incorrect: number;
	points: number | string;
}

export const formatRecords = (data: RawScore[]): FormattedRecord[] => {
	return data.map((item, index) => ({
		key: item.id.toString(),
		rank: index + 1,
		name: item.name,
		difficulty: Number(item.game_score) / Number(item.correct_count),
		correct: item.correct_count,
		incorrect: Number(item.asked_count) - Number(item.correct_count),
		points: item.game_score,
	}));
};
