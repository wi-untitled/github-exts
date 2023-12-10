import { useTranslation } from "react-i18next";

export function NoResult() {
    const { t } = useTranslation();

    return (
        <div className="h-14 w-full flex justify-center items-center">
            <p>{t("notifications.empty")}</p>
        </div>
    );
}
