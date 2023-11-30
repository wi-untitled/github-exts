import { observer, useLocalStore } from "mobx-react";
import { UserFollowersStore } from "./UserFollowersStore";
import { useService, useStore } from "src/hooks";
import { useMemo } from "react";
import { chunk } from "lodash";
import {
    UserFollowersButtonMore,
    UserFollowersList,
    UserFollowersTitle,
} from "./components";
import { CHUNK_LIMIT } from "./constants";

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
        <div className="w-full flex flex-col mt-3 mb-3">
            {userFollowersStore.isLoading ? (
                <div>loading</div>
            ) : (
                <>
                    <div className="flex flex-row justify-between">
                        <UserFollowersTitle
                            count={appStore.userData.followers}
                        />
                        <a
                            className="text-md"
                            target="_blank"
                            href={`https://github.com/${appStore.login}?tab=followers`}
                        >
                            Open all
                        </a>
                    </div>
                    <UserFollowersList followers={followers} />
                    <div className="mt-2">
                        <UserFollowersButtonMore
                            disabled={userFollowersStore.showMore}
                            onClick={userFollowersStore.getMoreUserFollowers}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export const UserFollowersModule = observer(UserFollowers);
