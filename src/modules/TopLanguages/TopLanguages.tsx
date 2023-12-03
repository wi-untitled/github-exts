import { observer, useLocalStore } from "mobx-react";
import { useService, useStore } from "src/hooks";
import { TopLanguagesStore } from "./TopLanguagesStore";
import { RacingBarChart } from "./components";
import { Widget } from "src/components/Widget/Widget";

export function TopLanguages() {
    const appStore = useStore("AppStore");
    const topLanguagesService = useService("TopLanguagesService");
    const topLanguagesStore = useLocalStore(
        () => new TopLanguagesStore(appStore, topLanguagesService),
    );

    // TODO: do we need to think for new github user who doesn't have any repos
    return (
        <Widget title="Top 5 Languages" minHeight="197px">
            {topLanguagesStore.isLoading ? (
                <div>Loading</div>
            ) : (
                <RacingBarChart
                    initData={topLanguagesStore.data}
                    medium={topLanguagesStore.medium}
                />
            )}
        </Widget>
    );
}

export const TopLanguagesModule = observer(TopLanguages);
