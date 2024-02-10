import { observer, useLocalStore } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useService, useStore } from "src/hooks";
import { Widget } from "src/components";
import { formatNumber } from "src/utils";
import { StatsStore } from "./StatsStore";
import { StatsIconsRenderConfig, IStatsIconKey } from "./config";
import { Tooltip } from "src/components/Tooltip";

export function Stats() {
    const appStore = useStore("AppStore");
    const statsService = useService("StatsService");
    const { t } = useTranslation();

    const statsStore = useLocalStore(
        () => new StatsStore(appStore, statsService),
    );

    const title = (
        <Tooltip id={Stats.TooltipId} info={t("stats.info")}>
            <strong className="text-sm">{t("stats.title")}</strong>
        </Tooltip>
    );

    return (
        <Widget title={title} isLoading={statsStore.isLoading}>
            <div className="space-y-2 p-3">
                {Object.keys(StatsIconsRenderConfig).map((key) => {
                    const StatsIcon =
                        StatsIconsRenderConfig[key as IStatsIconKey];
                    const statsValue = statsStore[key as IStatsIconKey];
                    const formattedValue =
                        typeof statsValue === "number"
                            ? formatNumber(statsValue)
                            : "";
                    const typedKey = key as IStatsIconKey;
                    const i18nKey = `stats.${typedKey}` as const;

                    return (
                        <div className="flex row space-x-3">
                            <StatsIcon className="w-4 h-4 fill-current dark:text-dark text-accent" />
                            <p>{t(i18nKey)}</p>
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
