import { STORAGE_KEYS } from "src/constants";
import { urls } from "src/services/constants";

export class UserFollowingsService {
    public constructor() {}

    public getUserFollowings = async (limit: number, page: number = 1) => {
        const result = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!result) {
            return;
        }

        try {
            const headers = new Headers();

            headers.set("Authorization", `Bearer ${result}`);
            headers.set("Accept", "application/vnd.github+json");
            headers.set("X-GitHub-Api-Version", "2022-11-28");

            const response = await fetch(
                `${urls.following.url}?per_page=${limit}&page=${page}`,
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
