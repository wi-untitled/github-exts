import { IFollower } from "src/types";
import { Url } from "src/utils";
import { CHUNK_LIMIT } from "src/modules/UserFollowings/constants";

export interface IUserFollowingsListProps {
    followings: IFollower[][];
    isCollapsed: boolean;
}

export function UserFollowingsList({
    followings,
    isCollapsed,
}: IUserFollowingsListProps) {
    return (
        <div
            className={`flex flex-col w-full transition-height delay-300 ease-out overflow-hidden`}
            style={{
                height: isCollapsed ? `2rem` : `${2 * followings.length}rem`,
            }}
        >
            {followings.map((chunkFollowings) => {
                let chunk = [];

                if (chunkFollowings.length < CHUNK_LIMIT) {
                    const fakeArray = new Array(
                        CHUNK_LIMIT - chunkFollowings.length,
                    ).fill(undefined);

                    chunk = [...chunkFollowings, ...fakeArray];
                } else {
                    chunk = chunkFollowings;
                }

                return (
                    <div className="flex flex-row w-full space-x-1 w-full">
                        {chunk.map((follower) => {
                            if (follower === undefined) {
                                return <div className="w-8 h-8"></div>;
                            }

                            const { login, avatarUrl } = follower;

                            return (
                                <a
                                    href={Url.makeGithubProfileUrl(login)}
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
