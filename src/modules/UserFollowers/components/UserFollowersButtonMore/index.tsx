export interface IUserFollowersButtonMoreProps {
    disabled: boolean;
    isLoading: boolean;
    onClick: () => void;
}

export function UserFollowersButtonMore({
    disabled,
    isLoading,
    onClick,
}: IUserFollowersButtonMoreProps) {
    return (
        <button onClick={onClick} disabled={!disabled}>
            {isLoading ? <span>Loading...</span> : <span>More</span>}
        </button>
    );
}
