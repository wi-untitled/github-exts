import { flattenLanguagesEdges } from "../flattenLanguagesEdges";

describe("[flattenLanguagesEdges.ts]", () => {
    const nodes = [
        {
            name: "repo1",
            languages: {
                edges: [
                    { node: { color: "red", name: "javascript" }, size: 1 },
                ],
            },
        },
        {
            name: "repo2",
            languages: {
                edges: [{ node: { color: "blue", name: "python" }, size: 2 }],
            },
        },
        {
            name: "repo3",
            languages: {
                edges: [{ node: { color: "green", name: "java" }, size: 3 }],
            },
        },
    ];

    test("should flatten languages edges", () => {
        const result = flattenLanguagesEdges(nodes);
        const expected = [
            { node: { color: "green", name: "java" }, size: 3 },
            { node: { color: "blue", name: "python" }, size: 2 },
            { node: { color: "red", name: "javascript" }, size: 1 },
        ];

        expect(result).toEqual(expected);
    });

    test("should return an empty array for empty nodes", () => {
        const result = flattenLanguagesEdges([]);

        expect(result).toEqual([]);
    });

    test("should return an empty array if all nodes have empty edges", () => {
        const nodesWithEmptyEdges = nodes.map((node) => ({
            name: node.name,
            languages: { edges: [] },
        }));
        const result = flattenLanguagesEdges(nodesWithEmptyEdges);

        expect(result).toEqual([]);
    });
});
