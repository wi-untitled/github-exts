import { icons as IconsTypes } from "src/components/Icon";

export const props = [
    "totalIssues",
    "totalMergedPullRequests",
    "totalPullRequests",
    "totalRepositoriesContributedTo",
    "totalRepositoryDiscussionComments",
    "totalRepositoryDiscussions",
    "totalStars",
] as const;

export const iconsConfig: Record<string, (typeof IconsTypes)[number]> = {
    totalIssues: "issues",
    totalMergedPullRequests: "pull-request",
    totalPullRequests: "pull-request",
    totalRepositoriesContributedTo: "repository",
    totalRepositoryDiscussionComments: "repository", // TODO: change icon
    totalRepositoryDiscussions: "repository", // TODO: change icon
    totalStars: "star",
};
