import { Octokit } from "octokit";
import { AppService } from ".";
import { ILanguage, ITopLanguage } from "src/types";
import { flattenLanguagesEdges } from "src/utils";
import { getTotalSizesByLanguages } from "src/utils/getTotalSizesByLanguages";

export class TopLanguagesService extends AppService {
    public getTopLanguages = async (
        login: string,
    ): Promise<[string, ITopLanguage][]> => {
        try {
            this.isAuthorized();

            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const response = await oktokit.graphql<{
                user: {
                    repositories: {
                        nodes: {
                            name: string;
                            languages: {
                                edges: {
                                    size: number; // bytes
                                    node: {
                                        color: string;
                                        name: string;
                                    };
                                }[];
                            };
                        }[];
                    };
                };
            }>(
                `
                    {
                        user(login: "${login}") {
                            repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
                              nodes {
                                name
                                languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                                  edges {
                                    size
                                    node {
                                      color
                                      name
                                    }
                                  }
                                }
                              }
                            }
                          }
                    }
                `,
                {
                    headers: {
                        authorization: `token ${this.accessToken}`,
                    },
                },
            );

            const repoNodes: ILanguage[] = response.user.repositories.nodes;

            const withoutEmptyLanguagesEdges = repoNodes.filter((node) => {
                return node.languages.edges.length;
            });

            const withFlattenLanguagesEdges = flattenLanguagesEdges(
                withoutEmptyLanguagesEdges,
            );

            const totalSizesByLanguages = getTotalSizesByLanguages(
                withFlattenLanguagesEdges,
            );

            const topLanguages = Object.entries(totalSizesByLanguages).sort(
                (x, y) => {
                    return Math.sign(y[1].size - x[1].size);
                },
            );

            return topLanguages;
        } catch (error) {
            return [];
        }
    };
}
