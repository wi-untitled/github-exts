import { observer, useLocalStore } from "mobx-react";
import { UserFollowersStore } from "./UserFollowersStore";
import { useService, useStore } from "../../hooks";
import { useMemo } from "react";
import { chunk } from "lodash";
import clsx from "clsx";

export function makeGithubProfileUrl(login: string) {
    return `https:/github.com/${login}`;
}

export const CHUNK_LIMIT = 9;

function UserFollowers() {
    const appStore = useStore("AppStore");
    const userFollowersService = useService("UserFollowersService");
    const userFollowersStore = useLocalStore(
        () => new UserFollowersStore(appStore, userFollowersService),
    );

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
                        <div className="text-md mb-2">
                            Followers({appStore.userData.followers})
                        </div>
                        <a
                            className="text-md"
                            target="_blank"
                            href={`https://github.com/${appStore.login}?tab=followers`}
                        >
                            Open all
                        </a>
                    </div>
                    <div className="flex flex-col w-full">
                        {followers.map((chunkFollowers) => {
                            let chunk = [];

                            if (chunkFollowers.length < CHUNK_LIMIT) {
                                const fakeArray = new Array(
                                    CHUNK_LIMIT - chunkFollowers.length,
                                ).fill(undefined);

                                chunk = [...chunkFollowers, ...fakeArray];
                            } else {
                                chunk = chunkFollowers;
                            }

                            return (
                                <div className="flex flex-row w-full space-x-1 w-full">
                                    {chunk.map((follower) => {
                                        if (follower === undefined) {
                                            return (
                                                <div className="w-8 h-8"></div>
                                            );
                                        }

                                        const { login, avatar_url } = follower;

                                        return (
                                            <a
                                                href={makeGithubProfileUrl(
                                                    login,
                                                )}
                                                className="w-8 h-8"
                                                target="_blank"
                                            >
                                                <img
                                                    className="rounded-full"
                                                    src={avatar_url}
                                                />
                                            </a>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-2">
                        <button
                            className={clsx({
                                ["text-gray-100"]: !userFollowersStore.showMore,
                                ["text-opacity-25"]:
                                    !userFollowersStore.showMore,
                            })}
                            onClick={userFollowersStore.getMoreUserFollowers}
                            disabled={!userFollowersStore.showMore}
                        >
                            More
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export const UserFollowersModule = observer(UserFollowers);
