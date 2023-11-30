import clsx from "clsx";

export interface IButtonProps {
    onClick: () => void;
    isDisabled: boolean;
}

export function Button({ onClick, isDisabled }: IButtonProps) {
    return (
        <button
            disabled={isDisabled}
            className={clsx("w-full rounded-md py-1", {
                "bg-red-200": isDisabled,
            })}
            onClick={onClick}
        >
            Setup access key
        </button>
    );
}
