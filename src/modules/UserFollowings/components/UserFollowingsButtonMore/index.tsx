import clsx from "clsx";

export interface IUserFollowingsButtonMoreProps {
    disabled: boolean;
    isLoading: boolean;
    onClick: () => void;
}

export function UserFollowingsButtonMore({
    disabled,
    isLoading,
    onClick,
}: IUserFollowingsButtonMoreProps) {
    return (
        <button
            className={clsx({
                ["text-gray-100"]: !disabled,
                ["text-opacity-25"]: !disabled,
            })}
            onClick={onClick}
            disabled={!disabled}
        >
            {isLoading ? <span>Loading...</span> : <span>More</span>}
        </button>
    );
}
