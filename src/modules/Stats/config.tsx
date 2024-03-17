import React from "react";
import { Icon } from "src/components";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const StatsIconsRenderConfig = {
    ["totalIssues"]: (props: Props) => <Icon {...props} icon="bug" />,
    ["totalRepositoriesContributedTo"]: (props: Props) => (
        <Icon {...props} icon="total" />
    ),
    ["totalRepositoryDiscussionComments"]: (props: Props) => (
        <Icon {...props} icon="tooltip" />
    ),
    ["totalRepositoryDiscussions"]: (props: Props) => (
        <Icon {...props} icon="messages" />
    ),
    ["totalStars"]: (props: Props) => <Icon {...props} icon="star" />,
    ["totalMergedPullRequests"]: (props: Props) => (
        <Icon {...props} icon="merged" />
    ),
};

export type IStatsIconKey = keyof typeof StatsIconsRenderConfig;
