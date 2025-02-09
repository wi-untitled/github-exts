import { observer, useLocalStore } from "mobx-react";
import { UserFollowersStore } from "src/modules/UserFollowers/UserFollowersStore";
import { useService, useStore, useCollapse } from "src/hooks";
import { useCallback, useMemo, useEffect } from "react";
import { chunk } from "lodash";
import {
    UserFollowersButtonMore,
    UserFollowersList,
} from "src/modules/UserFollowers/components";
import { CHUNK_LIMIT } from "src/modules/UserFollowers/constants";
import { Url } from "src/utils";
import { Widget, Link, NoResult } from "src/components";
import { useTranslation } from "react-i18next";

function UserFollowers() {
    const { isCollapsed, visibleCount, updateVisibleCount, updateCollapse } =
        useCollapse({ initVisibleCount: CHUNK_LIMIT });
    const appStore = useStore("AppStore");
    const userFollowersService = useService("UserFollowersService");
    const userFollowersStore = useLocalStore(
        () => new UserFollowersStore(appStore, userFollowersService),
    );
    const { t } = useTranslation();

    // TODO: make custom use with Generic
    const followers = useMemo(() => {
        return chunk(userFollowersStore.followers, CHUNK_LIMIT);
    }, [userFollowersStore.followers]);

    const handleGetMoreFollowersCallback = useCallback(() => {
        if (userFollowersStore.pageInfo?.hasNextPage) {
            userFollowersStore.getMoreUserFollowers();
        } else {
            updateCollapse(!isCollapsed);
        }
    }, [updateCollapse, userFollowersStore, isCollapsed]);

    const handleHideCallback = useCallback(() => {
        updateCollapse(true);
    }, [updateCollapse]);

    const isShowHide = useMemo(() => {
        return visibleCount === userFollowersStore.totalCount && !isCollapsed;
    }, [visibleCount, userFollowersStore.totalCount, isCollapsed]);

    useEffect(() => {
        if (visibleCount !== userFollowersStore.followers.length) {
            updateCollapse(false);
            updateVisibleCount(userFollowersStore.followers.length);
        }
    }, [
        visibleCount,
        userFollowersStore.followers.length,
        updateCollapse,
        updateVisibleCount,
    ]);

    return (
        <Widget
            title={`${t("userFollowers.title")}`}
            headerRight={
                <Link
                    href={`${Url.makeGithubProfileUrl(
                        userFollowersStore.totalCount.toString(),
                    )}?tab=followers`}
                >
                    {t("userFollowers.openAll")}
                </Link>
            }
            isLoading={userFollowersStore.isLoading}
        >
            {userFollowersStore.totalCount === 0 ? (
                <NoResult message={t("userFollowers.noResult")} />
            ) : (
                <div className="p-3">
                    <UserFollowersList
                        isCollapsed={isCollapsed}
                        followers={followers}
                    />
                    <UserFollowersButtonMore
                        isLoading={
                            userFollowersStore.isMoreUserFollowingsLoading
                        }
                        onMore={handleGetMoreFollowersCallback}
                        onHide={handleHideCallback}
                        showHide={isShowHide}
                        canLoadMore={userFollowersStore.canLoadMore}
                    />
                </div>
            )}
        </Widget>
    );
}

export const UserFollowersModule = observer(UserFollowers);
