import { useTranslation } from "react-i18next";

export interface IUserFollowersButtonMoreProps {
    isLoading: boolean;
    onMore: () => void;
    onHide: () => void;
    showHide: boolean;
    canLoadMore: boolean;
}

export function UserFollowersButtonMore({
    isLoading,
    onMore,
    onHide,
    showHide,
    canLoadMore,
}: IUserFollowersButtonMoreProps) {
    const { t } = useTranslation();

    if (!canLoadMore) {
        return null;
    }

    if (showHide) {
        return (
            <button onClick={onHide}>
                <span>{t("userFollowers.hide")}</span>
            </button>
        );
    }

    return (
        <button onClick={onMore}>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <span>{t("userFollowers.more")}</span>
            )}
        </button>
    );
}
