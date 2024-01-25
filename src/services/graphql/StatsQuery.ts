export const StatsQuery = `
    query StatsQuery($login: String!, $includeMergedPullRequests: Boolean!, $includeDiscussions: Boolean!, $after: String) {
        user(login: $login) {
            name
            login
            contributionsCollection {
                totalCommitContributions,
                totalPullRequestReviewContributions
            }
            repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
                totalCount
            }
            pullRequests(first: 1) {
                totalCount
            }
            mergedPullRequests: pullRequests(states: MERGED) @include(if: $includeMergedPullRequests) {
                totalCount
            }
            openIssues: issues(states: OPEN) {
                totalCount
            }
            closedIssues: issues(states: CLOSED) {
                totalCount
            }
            repositoryDiscussions @include(if: $includeDiscussions) {
                totalCount
            }
            repositoryDiscussionComments(onlyAnswers: true) {
                totalCount
            }
            repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}, after: $after) {
                totalCount
                nodes {
                    name
                    stargazers {
                        totalCount
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`;
