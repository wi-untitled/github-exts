import { describe, test, expect } from "vitest";
import { getRandomIndex } from "../getRandomIndex";

describe("getRandomIndex", () => {
    test("should return a valid index within the array bounds", () => {
        const array = [1, 2, 3, 4, 5];
        const result = getRandomIndex<number>(array);

        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(array.length);
    });
});
