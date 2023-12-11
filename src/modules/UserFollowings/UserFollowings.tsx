import { observer, useLocalStore } from "mobx-react";
import { UserFollowingsStore } from "src/modules/UserFollowings/UserFollowingsStore";
import { useService, useStore } from "src/hooks";
import { useMemo } from "react";
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
    const appStore = useStore("AppStore");
    const userFollowingsService = useService("UserFollowingsService");
    const userFollowingsStore = useLocalStore(
        () => new UserFollowingsStore(appStore, userFollowingsService),
    );

    const { t } = useTranslation();

    const followings = useMemo(() => {
        return chunk(userFollowingsStore.followings, CHUNK_LIMIT);
    }, [userFollowingsStore.followings]);

    return (
        <Widget
            title={`${t("userFollowings.title")} • ${
                appStore.userData.following
            }`}
            headerRight={
                <WidgetHeaderLink
                    href={`${makeGithubProfileUrl(
                        appStore.userData.login,
                    )}?tab=followers`}
                >
                    {t("userFollowings.openAll")}
                </WidgetHeaderLink>
            }
            minHeight="111px"
        >
            <div className="p-3">
                <UserFollowingsList followings={followings} />
                <UserFollowingsButtonMore
                    isLoading={userFollowingsStore.isLoading}
                    disabled={userFollowingsStore.showMore}
                    onClick={userFollowingsStore.getMoreUserFollowings}
                />
            </div>
        </Widget>
    );
}

export const UserFollowingsModule = observer(UserFollowings);
