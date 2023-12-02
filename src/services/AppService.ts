import { STORAGE_KEYS } from "src/constants";
import { Octokit } from "octokit";

export class AppService {
    public constructor() {}

    public getUserData = async () => {
        const result = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!result) {
            throw Error("No access token provided.");
        }

        try {
            const oktokit = new Octokit({
                auth: result,
            });

            const { data } = await oktokit.rest.users.getAuthenticated();

            return data;
        } catch (error) {
            console.trace(error);

            return {};
        }
    };

    public getUserFollowers = async () => {
        const result = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!result) {
            throw Error("No access token provided.");
        }

        try {
            const oktokit = new Octokit({
                auth: result,
            });

            const { data } =
                await oktokit.rest.users.listFollowersForAuthenticatedUser();

            return data;
        } catch (error) {
            console.trace(error);

            return {};
        }
    };
}
