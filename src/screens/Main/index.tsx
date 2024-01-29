import { observer } from "mobx-react";
import { useCallback, useState } from "react";
import { WidgetsId } from "src/enums";
import { useStore } from "src/hooks";
import { arrayMoveImmutable, arrayMoveMutable } from "src/utils";
import { SortableList } from "src/components";
import {
    UserProfileModule,
    UserFollowersModule,
    UserFollowingsModule,
    NotificationsModule,
    NotificationsRequstedChangesModule,
    TopLanguagesModule,
    NotificationsApprovedTop10Module,
    SocialAccountsModule,
    StatsModule,
} from "src/modules";

export function Main() {
    const appStore = useStore("AppStore");
    const settingsStore = useStore("SettingsStore");

    /**
     *
     * The SortableContext unique identifiers
     * must be strings or numbers bigger than 0.
     *
     */
    const [items, setItems] = useState<
        { render: () => React.ReactNode; id: number; key: WidgetsId }[]
    >(() => {
        const config = [
            {
                render: () =>
                    settingsStore.visibleWidgets[WidgetsId.UserFollowers] && (
                        <UserFollowersModule />
                    ),
                id: 1,
                key: WidgetsId.UserFollowers,
            },
            {
                render: () =>
                    settingsStore.visibleWidgets[WidgetsId.UserFollowers] && (
                        <UserFollowingsModule />
                    ),
                id: 2,
                key: WidgetsId.UserFollowings,
            },
            {
                render: () =>
                    settingsStore.visibleWidgets[WidgetsId.Notifications] && (
                        <NotificationsModule />
                    ),
                id: 3,
                key: WidgetsId.Notifications,
            },
            {
                render: () =>
                    settingsStore.visibleWidgets[
                        WidgetsId.NotificationsRequestedChanges
                    ] && <NotificationsRequstedChangesModule />,
                id: 4,
                key: WidgetsId.NotificationsRequestedChanges,
            },
            {
                render: () =>
                    settingsStore.visibleWidgets[
                        WidgetsId.NotificationsApprovedTop10
                    ] && <NotificationsApprovedTop10Module />,
                id: 5,
                key: WidgetsId.NotificationsApprovedTop10,
            },
            {
                render: () =>
                    settingsStore.visibleWidgets[WidgetsId.Stats] && (
                        <StatsModule />
                    ),
                id: 6,
                key: WidgetsId.Stats,
            },
            {
                render: () =>
                    settingsStore.visibleWidgets[WidgetsId.TopLanguages] && (
                        <TopLanguagesModule />
                    ),
                id: 7,
                key: WidgetsId.TopLanguages,
            },
            {
                render: () => <SocialAccountsModule />,
                id: 8,
                key: WidgetsId.SocialAccount,
            },
        ];
        settingsStore.predictable.forEach((widgetKey, newIndex) => {
            const oldIndex = config.findIndex(({ key }) => widgetKey === key);

            arrayMoveMutable(config, oldIndex, newIndex);
        });

        return config;
    });

    const handleSortEndCallback = useCallback(
        ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
            const newItems = arrayMoveImmutable(items, oldIndex, newIndex);
            setItems(newItems);

            const newPredictable = newItems.map(({ key }) => {
                return key;
            });

            settingsStore.updatePredictable(newPredictable);
        },
        [items, settingsStore],
    );

    return (
        <>
            {appStore.isAuthorized && <UserProfileModule />}
            <div className="flex flex-col w-full p-4 pb-8">
                <SortableList items={items} onSortEnd={handleSortEndCallback} />
            </div>
        </>
    );
}

Main.routeName = "/";

export const MainScreen = observer(Main);
