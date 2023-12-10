import clsx from "clsx";
import { useTranslation } from "react-i18next";

export interface IButtonProps {
    onClick: () => void;
    isDisabled: boolean;
}

export function Button({ onClick, isDisabled }: IButtonProps) {
    const { t } = useTranslation();

    return (
        <button
            disabled={isDisabled}
            className={clsx("w-full rounded-md py-1", {
                "bg-red-200": isDisabled,
            })}
            onClick={onClick}
        >
            {t("login.btnLogin")}
        </button>
    );
}
