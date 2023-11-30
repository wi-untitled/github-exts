export function makeGithubPullRequestUrl(url: string) {
    return url
        .replace("api.", "")
        .replace("repos/", "")
        .replace("pulls", "pull");
}
