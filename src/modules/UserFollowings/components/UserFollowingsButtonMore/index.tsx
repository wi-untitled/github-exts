import { useTranslation } from "react-i18next";

export interface IUserFollowingsButtonMoreProps {
    isLoading: boolean;
    onMore: () => void;
    onHide: () => void;
    showHide: boolean;
    canLoadMore: boolean;
}

export function UserFollowingsButtonMore({
    isLoading,
    onMore,
    onHide,
    showHide,
    canLoadMore,
}: IUserFollowingsButtonMoreProps) {
    const { t } = useTranslation();

    if (!canLoadMore) {
        return null;
    }

    if (showHide) {
        return (
            <button onClick={onHide}>
                <span>{t("userFollowings.hide")}</span>
            </button>
        );
    }

    return (
        <button onClick={onMore}>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <span>{t("userFollowings.more")}</span>
            )}
        </button>
    );
}
