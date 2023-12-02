import dayjs from "dayjs";
import { urls } from "src/services/constants";
import { Octokit } from "octokit";
import { AppService } from ".";

export class NotificationsService extends AppService {
    public constructor() {
        super();
    }

    public getNotificationsCreatedLastWeek = async () => {
        try {
            this.isAuthorized();

            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const created = dayjs().subtract(7, "day").format("YYYY-MM-DD");

            const { data } = await oktokit.rest.search.issuesAndPullRequests({
                q: `user-review-requested:@me+is:pull-request+created:>${created}`,
            });
            // TODO: check result when Vlad opened PR with assinged to @me
            return data;
        } catch (error) {
            console.trace(error);

            return [];
        }
    };

    public getNotifications = async () => {
        try {
            this.isAuthorized();

            const headers = new Headers();

            headers.set("Authorization", `Bearer ${this.accessToken}`);
            headers.set("Accept", "application/vnd.github+json");
            headers.set("X-GitHub-Api-Version", "2022-11-28");

            const params = new URLSearchParams();

            /**
             * Need to take since last one week
             */
            const since = dayjs()
                .subtract(7, "day")
                .format("YYYY-MM-DDTHH:mm:ssZ[Z]");

            params.set("all", "true");
            params.set("since", since);
            params.set("participating", "true");

            const response = await fetch(
                `${urls.notifications.url}?${params.toString()}`,
                {
                    method: "GET",
                    headers: headers,
                },
            );

            const json = await response.json();

            return json;
        } catch (error) {
            console.trace(error);

            return {};
        }
    };
}
