import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    return (
        <button onClick={onClick} disabled={!disabled}>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <span>{t("userFollowers.more")}</span>
            )}
        </button>
    );
}
