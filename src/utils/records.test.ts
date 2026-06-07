import { describe, expect, it } from "vitest";
import { formatRecords, type RawScore } from "./records";

const sample: RawScore[] = [
	{ id: 1, name: "Alice", game_score: 100, correct_count: 20, asked_count: 25 },
	{ id: 2, name: "Bob", game_score: 60, correct_count: 12, asked_count: 12 },
];

describe("formatRecords", () => {
	it("returns one row per raw score", () => {
		expect(formatRecords(sample)).toHaveLength(2);
	});

	it("assigns ranks by array order starting at 1", () => {
		const result = formatRecords(sample);
		expect(result[0].rank).toBe(1);
		expect(result[1].rank).toBe(2);
	});

	it("computes difficulty as score per correct answer", () => {
		expect(formatRecords(sample)[0].difficulty).toBe(5);
	});

	it("computes incorrect as asked minus correct", () => {
		const result = formatRecords(sample);
		expect(result[0].incorrect).toBe(5);
		expect(result[1].incorrect).toBe(0);
	});

	it("stringifies id into key", () => {
		expect(formatRecords(sample)[0].key).toBe("1");
	});

	it("coerces string numbers from the backend", () => {
		const raw: RawScore[] = [
			{
				id: "9",
				name: "Cara",
				game_score: "90",
				correct_count: "30",
				asked_count: "40",
			},
		];
		const [row] = formatRecords(raw);
		expect(row.difficulty).toBe(3);
		expect(row.incorrect).toBe(10);
	});

	it("returns an empty array for no records", () => {
		expect(formatRecords([])).toEqual([]);
	});
});
