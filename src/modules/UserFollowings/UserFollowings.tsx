import { observer, useLocalStore } from "mobx-react";
import { UserFollowingsStore } from "src/modules/UserFollowings/UserFollowingsStore";
import { useCollapse, useService, useStore } from "src/hooks";
import { useCallback, useEffect, useMemo } from "react";
import { chunk } from "lodash";
import {
    UserFollowingsButtonMore,
    UserFollowingsList,
} from "src/modules/UserFollowings/components";
import { CHUNK_LIMIT } from "src/modules/UserFollowings/constants";
import { makeGithubProfileUrl } from "src/utils";
import { Widget } from "src/components/Widget/Widget";
import { WidgetHeaderLink } from "src/components/Widget/WidgetHeaderLink/WidgetHeaderLink";
import { useTranslation } from "react-i18next";

function UserFollowings() {
    const { isCollapsed, visibleCount, updateVisibleCount, updateCollapse } =
        useCollapse({ initVisibleCount: CHUNK_LIMIT });
    const appStore = useStore("AppStore");
    const userFollowingsService = useService("UserFollowingsService");
    const userFollowingsStore = useLocalStore(
        () => new UserFollowingsStore(appStore, userFollowingsService),
    );

    const { t } = useTranslation();

    const followings = useMemo(() => {
        return chunk(userFollowingsStore.followings, CHUNK_LIMIT);
    }, [userFollowingsStore.followings]);

    const handleGetMoreFollowersCallback = useCallback(() => {
        if (userFollowingsStore.pageInfo?.hasNextPage) {
            userFollowingsStore.getMoreUserFollowings();
        } else {
            updateCollapse(!isCollapsed);
        }
    }, [updateCollapse, userFollowingsStore, isCollapsed]);

    const handleHideCallback = useCallback(() => {
        updateCollapse(true);
    }, [updateCollapse]);

    const isShowHide = useMemo(() => {
        return visibleCount === userFollowingsStore.totalCount && !isCollapsed;
    }, [visibleCount, userFollowingsStore.totalCount, isCollapsed]);

    useEffect(() => {
        if (visibleCount !== userFollowingsStore.followings.length) {
            updateCollapse(false);
            updateVisibleCount(userFollowingsStore.followings.length);
        }
    }, [
        visibleCount,
        userFollowingsStore.followings.length,
        updateCollapse,
        updateVisibleCount,
    ]);

    return (
        <Widget
            title={`${t("userFollowings.title")} • ${
                appStore.userData.following
            }`}
            headerRight={
                <WidgetHeaderLink
                    href={`${makeGithubProfileUrl(
                        userFollowingsStore.totalCount.toString(),
                    )}?tab=followers`}
                >
                    {t("userFollowings.openAll")}
                </WidgetHeaderLink>
            }
            isLoading={userFollowingsStore.isLoading}
        >
            <div className="p-3">
                <UserFollowingsList
                    followings={followings}
                    isCollapsed={isCollapsed}
                />
                <UserFollowingsButtonMore
                    isLoading={userFollowingsStore.isMoreUserFollowingsLoading}
                    onMore={handleGetMoreFollowersCallback}
                    onHide={handleHideCallback}
                    showHide={isShowHide}
                    canLoadMore={userFollowingsStore.canLoadMore}
                />
            </div>
        </Widget>
    );
}

export const UserFollowingsModule = observer(UserFollowings);
