import { HOST, STORAGE_KEYS } from "../constants";

export class UserFollowingsService {
    public constructor() {}

    public getUserFollowings = async (
        login: string,
        limit: number,
        page: number = 1,
    ) => {
        const result = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!result) {
            return;
        }

        try {
            const headers = new Headers();

            headers.set("Authorization", `Bearer ${result}`);

            const response = await fetch(
                `${HOST}/getUserFollowing?login=${login}&limit=${limit}&page=${page}`,
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
