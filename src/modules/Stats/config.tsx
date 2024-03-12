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
