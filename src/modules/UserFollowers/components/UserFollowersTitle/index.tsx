export interface IUserFollowersTitleProps {
    count: number;
}

export function UserFollowersTitle({ count }: IUserFollowersTitleProps) {
    return <div className="text-md mb-2">Followers({count})</div>;
}
