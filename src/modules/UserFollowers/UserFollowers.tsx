import { observer, useLocalStore } from "mobx-react";
import { UserFollowersStore } from "src/modules/UserFollowers/UserFollowersStore";
import { useService, useStore } from "src/hooks";
import { useMemo } from "react";
import { chunk } from "lodash";
import {
    UserFollowersButtonMore,
    UserFollowersList,
} from "src/modules/UserFollowers/components";
import { CHUNK_LIMIT } from "src/modules/UserFollowers/constants";
import { makeGithubProfileUrl } from "src/utils";
import { Widget } from "src/components/Widget/Widget";
import { WidgetHeaderLink } from "src/components/Widget/WidgetHeaderLink/WidgetHeaderLink";

function UserFollowers() {
    const appStore = useStore("AppStore");
    const userFollowersService = useService("UserFollowersService");
    const userFollowersStore = useLocalStore(
        () => new UserFollowersStore(appStore, userFollowersService),
    );

    // TODO: make custom use with Generic
    const followers = useMemo(() => {
        return chunk(userFollowersStore.followers, CHUNK_LIMIT);
    }, [userFollowersStore.followers]);

    return (
        <Widget
            title={`Followers • ${appStore.userData.followers}`}
            headerRight={
                <WidgetHeaderLink
                    href={`${makeGithubProfileUrl(
                        appStore.userData.login,
                    )}?tab=followers`}
                >
                    Open all
                </WidgetHeaderLink>
            }
            minHeight="111px"
        >
            <div className="p-3">
                <UserFollowersList followers={followers} />
                <UserFollowersButtonMore
                    isLoading={userFollowersStore.isLoading}
                    disabled={userFollowersStore.showMore}
                    onClick={userFollowersStore.getMoreUserFollowers}
                />
            </div>
        </Widget>
    );
}

export const UserFollowersModule = observer(UserFollowers);
