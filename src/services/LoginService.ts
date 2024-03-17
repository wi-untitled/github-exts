import { Octokit } from "octokit";

export class LoginService {
    public getUserData = async (token: string) => {
        if (!token) {
            return;
        }

        try {
            const oktokit = new Octokit({
                auth: token,
            });

            const { data } = await oktokit.rest.users.getAuthenticated();

            return data;
        } catch (error) {
            return {};
        }
    };
}
