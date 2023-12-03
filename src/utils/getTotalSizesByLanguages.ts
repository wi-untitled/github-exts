import { INodeWithSize, ITopLanguage } from "src/types";

export function getTotalSizesByLanguages(
    nodes: INodeWithSize[],
): Record<string, ITopLanguage> {
    let repoCount = 0;

    const result = nodes.reduce(
        (acc, language) => {
            let langSize = language.size;

            if (
                acc[language.node.name] &&
                language.node.name === acc[language.node.name].name
            ) {
                langSize = language.size + acc[language.node.name].size;
                repoCount = repoCount + 1;
            } else {
                repoCount = 0;
            }

            return {
                ...acc,
                [language.node.name]: {
                    name: language.node.name,
                    color: language.node.color,
                    size: langSize,
                    count: repoCount,
                },
            };
        },
        {} as Record<string, ITopLanguage>,
    );

    return result;
}
