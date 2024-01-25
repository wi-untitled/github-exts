import { observer, useLocalStore } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useService, useStore } from "src/hooks";
import { Icon, Widget } from "src/components";
import { formatNumber } from "src/utils";
import { iconsConfig, props } from "./config";
import { StatsStore } from "./StatsStore";

export function Stats() {
    const appStore = useStore("AppStore");
    const statsService = useService("StatsService");
    const { t } = useTranslation();

    const statsStore = useLocalStore(
        () => new StatsStore(appStore, statsService),
    );

    return (
        <Widget title={`${t("stats.title")}`} isLoading={statsStore.isLoading}>
            <div className="space-y-2 p-3">
                {props.map((p) => {
                    const hasIcon = Boolean(iconsConfig[p]);

                    return (
                        <div className="flex row space-x-3">
                            {hasIcon ? (
                                <Icon
                                    icon={iconsConfig[p]}
                                    className="w-4 h-4 fill-current text-gray-400 dark:text-gray-500"
                                />
                            ) : null}
                            <p>{t(`stats.${p}`)}</p>
                            <span className="grow flex justify-end">
                                {formatNumber(statsStore[p])}
                            </span>
                        </div>
                    );
                })}
            </div>
        </Widget>
    );
}

export const StatsModule = observer(Stats);
