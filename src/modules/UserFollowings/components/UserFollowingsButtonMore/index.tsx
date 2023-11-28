import clsx from "clsx";

export interface IUserFollowingsButtonMoreProps {
    disabled: boolean;
    onClick: () => void;
}

export function UserFollowingsButtonMore({
    disabled,
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
            More
        </button>
    );
}
