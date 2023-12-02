import { Octokit } from "octokit";
import { IResponseFollower } from "src/types";
import { AppService } from ".";

export class UserFollowingsService extends AppService {
    public constructor() {
        super();
    }

    public getUserFollowings = async (
        limit: number,
        page: number = 1,
    ): Promise<IResponseFollower[]> => {
        try {
            this.isAuthorized();

            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const { data = [] } =
                await oktokit.rest.users.listFollowedByAuthenticatedUser({
                    page: page,
                    per_page: limit,
                });

            return data;
        } catch (error) {
            console.trace(error);

            return [];
        }
    };
}
