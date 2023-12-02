import { Octokit } from "octokit";
import { STORAGE_KEYS } from "src/constants";
import { IResponseFollower } from "src/types";

export class UserFollowingsService {
    public constructor() {}

    public getUserFollowings = async (
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
