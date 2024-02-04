import { useTranslation } from "react-i18next";

export function WelcomeLoading() {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className="p-3 pb-1 text-[#4a8df8] text-2xl">
                {t("welcomeLoading")}
            </h1>
            <div className="absolute overflow-hidden w-full h-[2px]">
                <div className="absolute bg-[#4a8df8] h-[2px] w-full" />
                <div className="absolute bg-[#222] w-[6px] h-[2px] animate-dot1" />
                <div className="absolute bg-[#222] w-[6px] h-[2px] animate-dot2" />
                <div className="absolute bg-[#222] w-[6px] h-[2px] animate-dot3" />
            </div>
        </div>
    );
}
