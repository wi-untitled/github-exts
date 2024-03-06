import PullRequestIcon from "src/assets/request.svg?react";
import IssuesIcon from "src/assets/bug.svg?react";
import MergedIcon from "src/assets/merged.svg?react";
import TotalRepoIcon from "src/assets/total.svg?react";
import TotalCommentsIcon from "src/assets/tooltip.svg?react";
import TotalDiscussionIcon from "src/assets/messages.svg?react";
import TotalStarsIcon from "src/assets/star.svg?react";
import { Icon } from "src/components";

export const StatsIconsRenderConfig = {
    ["totalIssues"]: (props) => <Icon {...props} icon="bug" />,
    ["totalRepositoriesContributedTo"]: (props) => (
        <Icon {...props} icon="total" />
    ),
    ["totalRepositoryDiscussionComments"]: (props) => (
        <Icon {...props} icon="tooltip" />
    ),
    ["totalRepositoryDiscussions"]: (props) => (
        <Icon {...props} icon="messages" />
    ),
    ["totalStars"]: (props) => <Icon {...props} icon="star" />,
    ["totalMergedPullRequests"]: (props) => <Icon {...props} icon="merged" />,
};

export type IStatsIconKey = keyof typeof StatsIconsRenderConfig;
