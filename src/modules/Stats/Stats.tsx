import { observer, useLocalStore } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useService, useStore } from "src/hooks";
import { Widget } from "src/components";
import { formatNumber } from "src/utils";
import { StatsStore } from "./StatsStore";
import PullRequestIcon from "src/assets/request.svg?react";
import IssuesIcon from "src/assets/bug.svg?react";
import MergedIcon from "src/assets/merged.svg?react";
import TotalRepoIcon from "src/assets/total.svg?react";
import TotalCommentsIcon from "src/assets/tooltip.svg?react";
import TotalDiscussionIcon from "src/assets/messages.svg?react";
import TotalStarsIcon from "src/assets/star.svg?react";

export function Stats() {
    const appStore = useStore("AppStore");
    const statsService = useService("StatsService");
    const { t } = useTranslation();

    const statsStore = useLocalStore(
        () => new StatsStore(appStore, statsService),
    );

    const StatsIcons = {
        ["totalIssues"]: IssuesIcon,
        ["totalMergedPullRequests"]: MergedIcon,
        ["totalPullRequests"]: PullRequestIcon,
        ["totalRepositoriesContributedTo"]: TotalRepoIcon,
        ["totalRepositoryDiscussionComments"]: TotalCommentsIcon,
        ["totalRepositoryDiscussions"]: TotalDiscussionIcon,
        ["totalStars"]: TotalStarsIcon,
    };

    return (
        <Widget
            title={`${t("stats.title")}`}
            info={t("stats.info")}
            id={Stats.TooltipId}
            isLoading={statsStore.isLoading}
        >
            <div className="space-y-2 p-3">
                {Object.keys(StatsIcons).map((key) => {
                    const StatsIcon =
                        StatsIcons[key as keyof typeof StatsIcons];

                    const statsValue =
                        statsStore[key as keyof typeof statsStore];
                    const formattedValue =
                        typeof statsValue === "number"
                            ? formatNumber(statsValue)
                            : "";

                    return (
                        <div className="flex row space-x-3">
                            <StatsIcon className="w-4 h-4 fill-current dark:text-dark text-accent" />
                            <p>{t(`stats.${key}`)}</p>
                            <span className="grow flex justify-end">
                                {formattedValue}
                            </span>
                        </div>
                    );
                })}
            </div>
        </Widget>
    );
}

Stats.TooltipId = "Stats";

export const StatsModule = observer(Stats);
