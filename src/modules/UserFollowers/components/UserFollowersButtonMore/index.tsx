import clsx from "clsx";

export interface IUserFollowersButtonMoreProps {
    disabled: boolean;
    onClick: () => void;
}

export function UserFollowersButtonMore({
    disabled,
    onClick,
}: IUserFollowersButtonMoreProps) {
    return (
        <button
            className={clsx({
                ["text-gray-100"]: !disabled,
                ["text-opacity-25"]: !disabled,
            })}
            onClick={onClick}
            disabled={!disabled}
        >
            More
        </button>
    );
}
