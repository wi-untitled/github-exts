import { observer, useLocalStore } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useService, useStore } from "src/hooks";
import { Widget } from "src/components";
import { formatNumber } from "src/utils";
import { StatsStore } from "./StatsStore";
import { StatsIconsRenderConfig, IStatsIconKey } from "./config";

export function Stats() {
    const appStore = useStore("AppStore");
    const statsService = useService("StatsService");
    const { t } = useTranslation();

    const statsStore = useLocalStore(
        () => new StatsStore(appStore, statsService),
    );

    return (
        <Widget
            title={`${t("stats.title")}`}
            info={t("stats.info")}
            id={Stats.TooltipId}
            isLoading={statsStore.isLoading}
        >
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
