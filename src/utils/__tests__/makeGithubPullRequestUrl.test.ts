import { describe, test, expect } from "vitest";
import { makeGithubPullRequestUrl } from "..";

describe("[makeGithubPullRequestUrl.ts]", () => {
    test('should replace "api." with an empty string', () => {
        expect(
            makeGithubPullRequestUrl(
                "https://api.github.com/repos/wi-untitled/github-exts/pulls/17",
            ),
        ).toEqual("https://github.com/wi-untitled/github-exts/pull/17");
    });
});
