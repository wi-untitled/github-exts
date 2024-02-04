import clsx from "clsx";

export interface IButtonProps {
    onClick: () => void;
    isDisabled: boolean;
    text: string;
}

export function Button({ onClick, isDisabled, text }: IButtonProps) {
    return (
        <button
            disabled={isDisabled}
            className={clsx(
                "w-full rounded-md py-1 border bg-light dark:bg-dark border-light/[0.15] dark:border-dark/[0.15]",
            )}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
