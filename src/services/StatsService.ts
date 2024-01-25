import { AppService } from ".";
import { Octokit } from "octokit";
import { StatsQuery } from "src/services/graphql";

export class StatsService extends AppService {
    public constructor() {
        super();
    }

    public getStats = async ({
        login,
        includeMergedPullRequests,
        includeDiscussions,
    }: {
        login: string;
        includeMergedPullRequests: boolean;
        includeDiscussions: boolean;
    }) => {
        try {
            this.isAuthorized();

            const octokit = new Octokit({
                auth: this.accessToken,
            });

            const response = await octokit.graphql<any>({
                query: StatsQuery,
                login: login,
                includeMergedPullRequests: includeMergedPullRequests,
                includeDiscussions: includeDiscussions,
                after: null,
            });

            const totalStars = response.user.repositories.nodes.reduce(
                (acc, repository) => {
                    const {
                        stargazers: { totalCount },
                    } = repository;
                    return acc + totalCount;
                },
                0,
            );

            return {
                totalRepositoriesContributedTo:
                    response.user.repositoriesContributedTo.totalCount,
                totalPullRequests: response.user.pullRequests.totalCount,
                totalMergedPullRequests:
                    response.user.mergedPullRequests.totalCount,
                totalIssues:
                    response.user.openIssues.totalCount +
                    response.user.closedIssues.totalCount,
                totalRepositoryDiscussions:
                    response.user.repositoryDiscussions.totalCount,
                totalRepositoryDiscussionComments:
                    response.user.repositoryDiscussionComments.totalCount,
                totalStars: totalStars,
            };
        } catch (error) {
            return {};
        }
    };
}
