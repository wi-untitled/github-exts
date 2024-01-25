import { Octokit } from "octokit";
import { AppService } from ".";
import { ILanguage, ITopLanguage } from "src/types";
import { flattenLanguagesEdges } from "src/utils";
import { getTotalSizesByLanguages } from "src/utils/getTotalSizesByLanguages";
import { TopLanguagesQuery } from "src/services/graphql";
import { flow } from "lodash";

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
            }>({
                query: TopLanguagesQuery,
                login: login,
                includeMergedPullRequests: true,
            });

            const repoNodes: ILanguage[] = response.user.repositories.nodes;

            const topLanguages = flow(
                (xs) =>
                    xs.filter((node: ILanguage) => node.languages.edges.length),
                flattenLanguagesEdges,
                getTotalSizesByLanguages,
                (total: Record<string, ITopLanguage>) =>
                    Object.entries(total).sort((x, y) =>
                        Math.sign(y[1].size - x[1].size),
                    ),
            )(repoNodes);

            return topLanguages;
        } catch (error) {
            return [];
        }
    };
}
