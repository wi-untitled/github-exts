import { Octokit } from "octokit";
import { LoginService } from "../LoginService";

describe("LoginService", () => {
    let loginService: LoginService;

    beforeEach(() => {
        loginService = new LoginService();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("getUserData should return user data", async () => {
        const token = "abc123";
        const expectedData = { name: "John Doe", email: "johndoe@example.com" };

        Octokit.prototype.rest.users.getAuthenticated.mockResolvedValue({
            data: expectedData,
        });

        const result = await loginService.getUserData(token);

        expect(result).toEqual(expectedData);
    });

    test("getUserData should return undefined for empty token", async () => {
        const token = "";

        const result = await loginService.getUserData(token);

        expect(result).toBeUndefined();
    });

    test("getUserData should return empty object on API call failure", async () => {
        const token = "abc123";

        Octokit.prototype.rest.users.getAuthenticated.mockRejectedValueOnce(
            new Error("API call failed"),
        );

        const result = await loginService.getUserData(token);

        expect(result).toEqual({});
    });
});
