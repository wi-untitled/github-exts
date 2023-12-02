import { Octokit } from "octokit";
import { STORAGE_KEYS } from "src/constants";

export class UserProfileService {
    public constructor() {}

    public getUserData = async () => {
        const result = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!result) {
            return;
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
}
