import { observer, useLocalStore } from "mobx-react";
import { UserFollowersStore } from "./UserFollowersStore";
import { useService, useStore } from "../../hooks";

export function makeGithubProfileUrl(login: string) {
    return `https:/github.com/${login}`;
}

function UserFollowers() {
    const appStore = useStore("AppStore");
    const appService = useService("AppService");
    const userFollowersStore = useLocalStore(
        () => new UserFollowersStore(appStore, appService),
    );

    return (
        <div className="w-full flex flex-col mt-3">
            {userFollowersStore.isLoading ? (
                <div>loading</div>
            ) : (
                <>
                    <div className="flex flex-row justify-between">
                        <div className="text-md mb-2">Followers</div>
                        <a
                            className="text-md"
                            target="_blank"
                            href={`https://github.com/${appStore.login}?tab=followers`}
                        >
                            All
                        </a>
                    </div>
                    <div className="flex flex-row justify-between w-full space-x-1">
                        {userFollowersStore.followers.map(
                            ({ login, avatar_url }) => {
                                return (
                                    <a
                                        href={makeGithubProfileUrl(login)}
                                        className="w-16 h-16"
                                        target="_blank"
                                    >
                                        <img
                                            className="rounded-full"
                                            src={avatar_url}
                                        />
                                    </a>
                                );
                            },
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export const UserFollowersModule = observer(UserFollowers);
