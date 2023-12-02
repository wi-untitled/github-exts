import { STORAGE_KEYS } from "src/constants";
import { Octokit } from "octokit";
import { IResponseFollower } from "src/types";

export class UserFollowersService {
    public constructor() {}

    public getUserFollowers = async (
        limit: number,
        page: number = 1,
    ): Promise<IResponseFollower[]> => {
        const result = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!result) {
            throw Error("No access token provided.");
        }

        try {
            const oktokit = new Octokit({
                auth: result,
            });

            const { data = [] } =
                await oktokit.rest.users.listFollowersForAuthenticatedUser({
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
