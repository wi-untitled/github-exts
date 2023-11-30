import { HOST, STORAGE_KEYS } from "src/constants";

export class AppService {
    public constructor() {}

    public getUserData = async () => {
        const result = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!result) {
            return;
        }

        try {
            const headers = new Headers();

            headers.set("Authorization", `Bearer ${result}`);
            headers.set("Accept", "application/vnd.github+json");
            headers.set("X-GitHub-Api-Version", "2022-11-28");

            const response = await fetch(`https://api.github.com/user`, {
                method: "GET",
                headers: headers,
            });

            const json = await response.json();

            return json;
        } catch (error) {
            console.trace(error);

            return {};
        }
    };

    public getUserFollowers = async (login: string) => {
        const result = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!result) {
            return;
        }

        try {
            const headers = new Headers();

            headers.set("Authorization", `Bearer ${result}`);

            const response = await fetch(
                `${HOST}/getUserFollower?login=${login}`,
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
