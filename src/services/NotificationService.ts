import dayjs from "dayjs";
import { Octokit } from "octokit";
import { AppService } from ".";
import { INotification } from "src/types";

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

            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const response = await oktokit.rest.search.issuesAndPullRequests({
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

            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const response = await oktokit.rest.search.issuesAndPullRequests({
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
}
