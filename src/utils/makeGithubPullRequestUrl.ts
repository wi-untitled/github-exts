export function makeGithubPullRequestUrl(url: string) {
    const [, , , owner, repo] = url.split("/");
    return `${owner}/${repo}`;
}
