import PullRequestIcon from "src/assets/request.svg?react";
import IssuesIcon from "src/assets/bug.svg?react";
import MergedIcon from "src/assets/merged.svg?react";
import TotalRepoIcon from "src/assets/total.svg?react";
import TotalCommentsIcon from "src/assets/tooltip.svg?react";
import TotalDiscussionIcon from "src/assets/messages.svg?react";
import TotalStarsIcon from "src/assets/star.svg?react";

export const StatsIconsRenderConfig = {
    ["totalIssues"]: IssuesIcon,
    ["totalMergedPullRequests"]: MergedIcon,
    ["totalPullRequests"]: PullRequestIcon,
    ["totalRepositoriesContributedTo"]: TotalRepoIcon,
    ["totalRepositoryDiscussionComments"]: TotalCommentsIcon,
    ["totalRepositoryDiscussions"]: TotalDiscussionIcon,
    ["totalStars"]: TotalStarsIcon,
};

export type IStatsIconKey = keyof typeof StatsIconsRenderConfig;
