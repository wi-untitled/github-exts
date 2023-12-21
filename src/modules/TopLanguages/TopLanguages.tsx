import { observer, useLocalStore } from "mobx-react";
import { useService, useStore } from "src/hooks";
import { TopLanguagesStore } from "./TopLanguagesStore";
import { RacingBarChart } from "./components";
import { Widget } from "src/components/Widget/Widget";
import { useTranslation } from "react-i18next";

export function TopLanguages() {
    const appStore = useStore("AppStore");
    const topLanguagesService = useService("TopLanguagesService");
    const topLanguagesStore = useLocalStore(
        () => new TopLanguagesStore(appStore, topLanguagesService),
    );
    const { t } = useTranslation();
    // TODO: do we need to think for new github user who doesn't have any repos
    return (
        <Widget
            isLoading={topLanguagesStore.isLoading}
            title={t("topLanguages.title")}
            info={t("topLanguages.info")}
            id={TopLanguages.TooltipId}
        >
            <RacingBarChart
                initData={topLanguagesStore.data}
                medium={topLanguagesStore.medium}
            />
        </Widget>
    );
}

TopLanguages.TooltipId = "TopLanguages";

export const TopLanguagesModule = observer(TopLanguages);
