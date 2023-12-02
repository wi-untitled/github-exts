import { STORAGE_KEYS } from "src/constants";
import { Octokit } from "octokit";

export class AppService {
    public accessToken?: string;

    public constructor() {}

    public isAuthorized = async () => {
        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!accessToken) {
            throw Error("No access token provided.");
        } else {
            this.accessToken = accessToken;
        }
    };

    public getUserData = async () => {
        this.isAuthorized();

        try {
            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const { data } = await oktokit.rest.users.getAuthenticated();

            return data;
        } catch (error) {
            console.trace(error);

            return {};
        }
    };
}
