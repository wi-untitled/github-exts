import { Octokit } from "octokit";
import { StatsService } from "../StatsService";
import { STORAGE_KEYS } from "src/constants";

const mock = {
    user: {
        name: "name",
        login: "login",
        contributionsCollection: {
            totalCommitContributions: 389,
            totalPullRequestReviewContributions: 7,
        },
        repositoriesContributedTo: {
            totalCount: 6,
        },
        pullRequests: {
            totalCount: 194,
        },
        mergedPullRequests: {
            totalCount: 171,
        },
        openIssues: {
            totalCount: 54,
        },
        closedIssues: {
            totalCount: 37,
        },
        repositoryDiscussions: {
            totalCount: 0,
        },
        repositoryDiscussionComments: {
            totalCount: 0,
        },
        repositories: {
            totalCount: 118,
            nodes: [
                {
                    name: "homepage",
                    stargazers: {
                        totalCount: 0,
                    },
                },
            ],
            pageInfo: {
                hasNextPage: true,
                endCursor: "string=",
            },
        },
    },
};

describe("StatsService", () => {
    let statsService: StatsService;

    beforeEach(() => {
        statsService = new StatsService();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("getStats", () => {
        test("should return stats of user repositories", async () => {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, "1234");

            vi.spyOn(statsService, "isAuthorized").mockImplementation(
                () => true,
            );

            Octokit.prototype.graphql.mockResolvedValueOnce(mock);

            const result = await statsService.getStats({
                login: "login",
                includeMergedPullRequests: true,
                includeDiscussions: true,
            });
            console.log(result);
            expect(result).toEqual({
                totalRepositoriesContributedTo: 6,
                totalPullRequests: 194,
                totalMergedPullRequests: 171,
                totalIssues: 91,
                totalRepositoryDiscussions: 0,
                totalRepositoryDiscussionComments: 0,
                totalStars: 0,
            });

            expect(statsService.isAuthorized).toHaveBeenCalledTimes(1);
        });
    });
});
