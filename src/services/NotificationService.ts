import dayjs from "dayjs";
import { Octokit } from "octokit";
import { AppService } from ".";
import { INotification } from "src/types";

export class NotificationsService extends AppService {
    public constructor() {
        super();
    }

    public getNotificationsCreatedLastWeek = async (): Promise<{
        items: INotification[];
    }> => {
        try {
            this.isAuthorized();

            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const created = dayjs().subtract(7, "day").format("YYYY-MM-DD");

            const response = await oktokit.rest.search.issuesAndPullRequests({
                q: `user-review-requested:@me+is:pull-request+created:>${created}+state:open`,
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
