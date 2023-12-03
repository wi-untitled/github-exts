import { ILanguage, INodeWithSize } from "src/types";

export function flattenLanguagesEdges(nodes: ILanguage[]): INodeWithSize[] {
    const withFlattenLanguagesEdges = nodes.reduce(
        (acc, node) => {
            return node.languages.edges.concat(acc);
        },
        [] as { node: { color: string; name: string }; size: number }[],
    );

    return withFlattenLanguagesEdges;
}
