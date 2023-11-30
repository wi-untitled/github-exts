export interface IUserFollowersButtonMoreProps {
    disabled: boolean;
    onClick: () => void;
}

export function UserFollowersButtonMore({
    disabled,
    onClick,
}: IUserFollowersButtonMoreProps) {
    return (
        <button onClick={onClick} disabled={!disabled}>
            More
        </button>
    );
}
