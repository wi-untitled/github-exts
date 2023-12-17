import dayjs from "dayjs";
import { Octokit } from "octokit";
import { AppService } from ".";
import { INotification, IPullRequest, IPullRequestNode } from "src/types";
import { NotificationsApprovedTop10Query } from "src/services/graphql";
import { flow } from "lodash";

export class NotificationsService extends AppService {
    public constructor() {
        super();
    }

    public static createdLastWeek = () => {
        const created = dayjs().subtract(7, "day").format("YYYY-MM-DD");

        return created;
    };

    public getNotificationsCreatedLastWeek = async (): Promise<{
        items: INotification[];
    }> => {
        try {
            this.isAuthorized();

            const octokit = new Octokit({
                auth: this.accessToken,
            });

            const response = await octokit.rest.search.issuesAndPullRequests({
                q: `user-review-requested:@me+is:pull-request+created:>${NotificationsService.createdLastWeek()}+state:open`,
            });

            return {
                items: response.data.items as INotification[],
            };
        } catch (error) {
            console.trace(error);

            return {
                items: [],
            };
        }
    };

    public getNotificationsRequestedChangesCreatedLastWeek = async (): Promise<{
        items: INotification[];
    }> => {
        try {
            this.isAuthorized();

            const octokit = new Octokit({
                auth: this.accessToken,
            });

            const response = await octokit.rest.search.issuesAndPullRequests({
                q: `reviewed-by:@me+is:pull-request+created:>${NotificationsService.createdLastWeek()}+state:open+review:changes_requested`,
            });

            return {
                items: response.data.items as INotification[],
            };
        } catch (error) {
            console.trace(error);

            return {
                items: [],
            };
        }
    };

    /**
     * Approved pull requests are pr which has at least one approvals.
     */
    public getNotificationsApprovedTop10 = async ({
        login,
    }: {
        login: string;
    }): Promise<{
        items: INotification[];
    }> => {
        try {
            this.isAuthorized();

            const octokit = new Octokit({
                auth: this.accessToken,
            });

            const response = await octokit.graphql<{
                user: {
                    pullRequests: IPullRequest;
                };
            }>({
                query: NotificationsApprovedTop10Query,
                login: login,
            });

            const notificationsApprovedTop10Items = flow(
                () =>
                    response.user.pullRequests.nodes.filter(
                        ({ reviewDecision }: IPullRequestNode) => {
                            return reviewDecision === "APPROVED";
                        },
                    ),
                (xs) =>
                    xs.map((x) => ({
                        pull_request: {
                            html_url: x.url,
                        },
                        title: x.title,
                        created_at: x.createdAt,
                    })),
            );

            return {
                items: notificationsApprovedTop10Items(),
            };
        } catch (error) {
            console.trace(error);

            return {
                items: [],
            };
        }
    };
}
