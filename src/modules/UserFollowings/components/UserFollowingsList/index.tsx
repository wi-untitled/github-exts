import { IFollower } from "../../../../types";
import { makeGithubProfileUrl } from "../../../../utils";
import { CHUNK_LIMIT } from "../../constants";

export interface IUserFollowingsListProps {
    followings: IFollower[][];
}

export function UserFollowingsList({ followings }: IUserFollowingsListProps) {
    return (
        <div className="flex flex-col w-full">
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

                            const { login, avatar_url } = follower;

                            return (
                                <a
                                    href={makeGithubProfileUrl(login)}
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
    );
}
