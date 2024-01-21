import { makeGithubPullRequestUrl } from "..";

describe("[makeGithubPullRequestUrl.ts]", () => {
    test("should return the owner and repo from the input url", () => {
        const url = "https://github.com/owner/repo";
        const result = makeGithubPullRequestUrl(url);
        expect(result).toEqual("owner/repo");
    });
});
