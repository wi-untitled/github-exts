import { Octokit } from "octokit";
import { AppService } from ".";
import {
    ILanguage,
    IStats,
    ITopLanguage,
    ITopLanguageResponse,
} from "src/types";
import { Languages } from "src/utils";
import { TopLanguagesQuery } from "src/services/graphql";
import { flow } from "lodash";

export class TopLanguagesService extends AppService {
    public getTopLanguages = async (login: string): Promise<IStats | []> => {
        try {
            this.isAuthorized();

            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const response = (await oktokit.graphql({
                query: TopLanguagesQuery,
                login: login,
                includeMergedPullRequests: true,
            })) as ITopLanguageResponse;

            const repoNodes: ILanguage[] = response.user.repositories.nodes;

            const topLanguages = flow(
                (xs) =>
                    xs.filter((node: ILanguage) => node.languages.edges.length),
                Languages.flattenLanguagesEdges,
                Languages.getTotalSizesByLanguages,
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
