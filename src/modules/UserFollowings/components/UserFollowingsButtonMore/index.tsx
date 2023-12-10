import clsx from "clsx";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    return (
        <button
            className={clsx({
                ["text-gray-100"]: !disabled,
                ["text-opacity-25"]: !disabled,
            })}
            onClick={onClick}
            disabled={!disabled}
        >
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <span>{t("userFollowings.more")}</span>
            )}
        </button>
    );
}
