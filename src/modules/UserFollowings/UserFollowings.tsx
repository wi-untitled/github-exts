import { observer, useLocalStore } from "mobx-react";
import { UserFollowingsStore } from "./UserFollowingsStore";
import { useService, useStore } from "../../hooks";
import { useMemo } from "react";
import { chunk } from "lodash";
import {
    UserFollowingsButtonMore,
    UserFollowingsList,
    UserFollowingsTitle,
} from "./components";
import { CHUNK_LIMIT } from "./constants";

function UserFollowings() {
    const appStore = useStore("AppStore");
    const userFollowingsService = useService("UserFollowingsService");
    const userFollowingsStore = useLocalStore(
        () => new UserFollowingsStore(appStore, userFollowingsService),
    );

    const followings = useMemo(() => {
        return chunk(userFollowingsStore.followings, CHUNK_LIMIT);
    }, [userFollowingsStore.followings]);

    return (
        <div className="w-full flex flex-col mt-3 mb-3">
            {userFollowingsStore.isLoading ? (
                <div>loading</div>
            ) : (
                <>
                    <div className="flex flex-row justify-between">
                        <UserFollowingsTitle
                            count={appStore.userData.following}
                        />
                        <a
                            className="text-md"
                            target="_blank"
                            href={`https://github.com/${appStore.login}?tab=following`}
                        >
                            Open all
                        </a>
                    </div>
                    <UserFollowingsList followings={followings} />
                    <div className="mt-2">
                        <UserFollowingsButtonMore
                            disabled={userFollowingsStore.showMore}
                            onClick={userFollowingsStore.getMoreUserFollowings}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export const UserFollowingsModule = observer(UserFollowings);
