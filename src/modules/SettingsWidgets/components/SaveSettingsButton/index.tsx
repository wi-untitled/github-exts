import clsx from "clsx";
import { useTranslation } from "react-i18next";

export interface ISaveSettingsButtonProps {
    onClick: () => void;
    needSave: boolean;
}

export function SaveSettingsButton({
    onClick,
    needSave,
}: ISaveSettingsButtonProps) {
    const { t } = useTranslation();

    return (
        <button
            className={clsx("w-full rounded-md py-1 text-white", {
                "bg-green-500": needSave,
                "bg-zinc-700": !needSave,
            })}
            onClick={onClick}
        >
            {t("settingsWidgets.saveButton")}
        </button>
    );
}
