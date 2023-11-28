import { describe, test, expect } from "vitest";
import { makeGithubProfileUrl } from "..";

describe("[makeGithubProfileUrl]", () => {
    test("should return the correct github profile URL", () => {
        const login = "username";
        const expectedUrl = "https:/github.com/username";

        const result = makeGithubProfileUrl(login);

        expect(result).toBe(expectedUrl);
    });
});
