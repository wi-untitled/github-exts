export class LoginService {
    public constructor() {}

    public getUserData = async (token: string) => {
        if (!token) {
            return;
        }

        try {
            const headers = new Headers();

            headers.set("Authorization", `Bearer ${token}`);
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
}
