import { describe, test, expect } from "vitest";
import { getTotalSizesByLanguages } from "..";

describe("[flattenLanguagesEdges.ts]", () => {
    test("getTotalSizesByLanguages should return the correct result", () => {
        const nodes = [
            { size: 10, node: { name: "JavaScript", color: "yellow" } },
            { size: 15, node: { name: "Python", color: "blue" } },
            { size: 12, node: { name: "JavaScript", color: "yellow" } },
            { size: 20, node: { name: "Java", color: "orange" } },
            { size: 8, node: { name: "Python", color: "blue" } },
        ];

        const expected = {
            JavaScript: {
                name: "JavaScript",
                color: "yellow",
                size: 22,
                count: 1,
            },
            Python: { name: "Python", color: "blue", size: 23, count: 1 },
            Java: { name: "Java", color: "orange", size: 20, count: 0 },
        };

        expect(getTotalSizesByLanguages(nodes)).toEqual(expected);
    });
});
