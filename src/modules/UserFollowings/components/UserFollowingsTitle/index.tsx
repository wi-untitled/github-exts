export interface IUserFollowingsTitleProps {
    count: number;
}

export function UserFollowingsTitle({ count }: IUserFollowingsTitleProps) {
    return <div className="text-md mb-2">Followings({count})</div>;
}
