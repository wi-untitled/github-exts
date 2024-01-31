import { STORAGE_KEYS } from "src/constants";
import { Octokit, RequestError } from "octokit";
import { BadCredentinals } from "src/errors";

export class AppService {
    public accessToken?: string;

    public constructor() {}

    public isAuthorized = () => {
        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!accessToken) {
            throw Error("No access token provided.");
        } else {
            this.accessToken = accessToken;
        }
    };

    public getUserData = async () => {
        try {
            this.isAuthorized();

            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const { data } = await oktokit.rest.users.getAuthenticated();

            return data;
        } catch (error) {
            return this.getBadCredentinalsError(error);
        }
    };

    public getBadCredentinalsError = (error: RequestError): BadCredentinals => {
        const message = (error as RequestError).response.data.message;
        const status = (error as RequestError).status;
        const badCredentinals = new BadCredentinals(status, message);

        return badCredentinals;
    };
}
