import { afterEach, describe, expect, it, vi } from "vitest";
import {
	generateAnswersArray,
	generateRandomNaturalNumber,
	getBackgroundColor,
} from "./game";

describe("getBackgroundColor", () => {
	it("returns undefined when answers are hidden", () => {
		expect(getBackgroundColor(false, 5, 5, 5)).toBeUndefined();
	});

	it("marks the correct answer green", () => {
		expect(getBackgroundColor(true, 12, 12, 8)).toBe("green");
	});

	it("marks the selected wrong answer red", () => {
		expect(getBackgroundColor(true, 8, 12, 8)).toBe("red");
	});

	it("returns undefined for unselected, incorrect answers", () => {
		expect(getBackgroundColor(true, 9, 12, 8)).toBeUndefined();
	});

	it("prefers green when selected answer is also correct", () => {
		expect(getBackgroundColor(true, 12, 12, 12)).toBe("green");
	});
});

describe("generateRandomNaturalNumber", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("stays within [min, max] inclusive", () => {
		for (let i = 0; i < 500; i++) {
			const n = generateRandomNaturalNumber({ min: 2, max: 9 });
			expect(n).toBeGreaterThanOrEqual(2);
			expect(n).toBeLessThanOrEqual(9);
			expect(Number.isInteger(n)).toBe(true);
		}
	});

	it("defaults min to 2", () => {
		for (let i = 0; i < 500; i++) {
			expect(generateRandomNaturalNumber({ max: 5 })).toBeGreaterThanOrEqual(2);
		}
	});

	it("returns min when random is 0", () => {
		vi.spyOn(Math, "random").mockReturnValue(0);
		expect(generateRandomNaturalNumber({ min: 2, max: 10 })).toBe(2);
	});

	it("returns max when random approaches 1", () => {
		vi.spyOn(Math, "random").mockReturnValue(0.999999);
		expect(generateRandomNaturalNumber({ min: 2, max: 10 })).toBe(10);
	});

	it("returns a single value when min equals max", () => {
		expect(generateRandomNaturalNumber({ min: 7, max: 7 })).toBe(7);
	});
});

describe("generateAnswersArray", () => {
	it("always returns exactly 4 unique answers", () => {
		for (let i = 1; i < 100; i++) {
			const answers = generateAnswersArray(i);
			expect(answers).toHaveLength(4);
			expect(new Set(answers).size).toBe(4);
		}
	});

	it("always includes the correct answer", () => {
		for (let i = 1; i < 100; i++) {
			expect(generateAnswersArray(i)).toContain(i);
		}
	});

	it("only contains positive natural numbers", () => {
		for (let i = 1; i < 100; i++) {
			for (const answer of generateAnswersArray(i)) {
				expect(answer).toBeGreaterThan(0);
				expect(Number.isInteger(answer)).toBe(true);
			}
		}
	});

	it("keeps distractors within +/-10 of the correct answer", () => {
		for (let i = 1; i < 100; i++) {
			for (const answer of generateAnswersArray(i)) {
				expect(Math.abs(answer - i)).toBeLessThanOrEqual(10);
			}
		}
	});
});
