import { STORAGE_KEYS } from "src/constants";
import { AppService } from "../AppService";
import { Octokit } from "octokit";

describe("AppService", () => {
    test("should set accessToken if local storage has access token", () => {
        const accessToken = "test-access-token";

        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

        const appService = new AppService();
        appService.isAuthorized();

        expect(appService.accessToken).toBe(accessToken);
    });

    test("should throw an error if no access token in local storage", () => {
        const appService = new AppService();

        expect(() => {
            appService.isAuthorized();
        }).toThrow("No access token provided.");
    });

    test("should return user data when authorized", async () => {
        const accessToken = "test-access-token";

        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

        const userData = { name: "John Doe", username: "johndoe" };

        Octokit.prototype.rest.users.getAuthenticated.mockResolvedValue({
            data: userData,
        });

        const appService = new AppService();
        const data = await appService.getUserData();

        expect(data).toBe(userData);
        expect(appService.accessToken).toBe(accessToken);
        expect(
            Octokit.prototype.rest.users.getAuthenticated,
        ).toHaveBeenCalled();
    });

    test("should return an empty object and log the error when not authorized", async () => {
        const consoleSpy = vi
            .spyOn(console, "trace")
            .mockImplementation(() => {});

        const appService = new AppService();
        const data = await appService.getUserData();

        expect(data).toEqual({});
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});
