import dayjs from "dayjs";
import { STORAGE_KEYS } from "src/constants";
import { urls } from "src/services/constants";
import { Octokit } from "octokit";

export class NotificationsService {
    public constructor() {}

    public getNotificationsCreatedLastWeek = async () => {
        try {
            const result = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

            if (!result) {
                throw Error("No Access Key provided.");
            }

            const oktokit = new Octokit({
                auth: result,
            });

            const created = dayjs().subtract(7, "day").format("YYYY-MM-DD");

            const { data } = await oktokit.rest.search.issuesAndPullRequests({
                q: `user-review-requested:@me+is:pull-request+created:>${created}`,
            });

            return data;
        } catch (error) {
            console.trace(error);

            return [];
        }
    };

    public getNotifications = async () => {
        const result = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!result) {
            return;
        }

        try {
            const headers = new Headers();

            headers.set("Authorization", `Bearer ${result}`);
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
