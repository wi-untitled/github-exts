import { IFollower } from "src/types";
import { makeGithubProfileUrl } from "src/utils";
import { CHUNK_LIMIT } from "src/modules/UserFollowers/constants";

export interface IUserFollowersListProps {
    followers: IFollower[][];
    isCollapsed: boolean;
}

export function UserFollowersList({
    followers,
    isCollapsed,
}: IUserFollowersListProps) {
    return (
        <div
            className={`flex flex-col w-full transition-height delay-300 ease-out overflow-hidden`}
            style={{
                height: isCollapsed ? `2rem` : `${2 * followers.length}rem`,
            }}
        >
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
                    <div className="flex flex-row w-full space-x-1">
                        {chunk.map((follower) => {
                            if (follower === undefined) {
                                return <div className="w-8 h-8"></div>;
                            }

                            const { login, avatarUrl } = follower;

                            return (
                                <a
                                    href={makeGithubProfileUrl(login)}
                                    className="w-8 h-8"
                                    target="_blank"
                                >
                                    <img
                                        className="rounded-full"
                                        src={avatarUrl}
                                    />
                                </a>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
