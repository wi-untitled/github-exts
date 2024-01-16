import { useTranslation } from "react-i18next";
import { SecurityMan } from "..";

export function PopupNoAuth() {
    const { t } = useTranslation();

    return (
        <div className="w-full text-s mt-4 justify-center flex">
            <span>{t("popup.notAuthorized")}</span>
            <SecurityMan />
        </div>
    );
}
