import { useTranslation } from "react-i18next";
import { SecurityMan, Link } from "..";

export function Instruction() {
    const { t } = useTranslation();

    return (
        <div className="w-full h-screen relative p-4">
            <div className="h-[calc(100%-260px)] overflow-auto space-y-4">
                <Link href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">
                    {t("popup.githubInstruction")}
                </Link>
                <div>
                    <p className="text-xl">{t("popup.permissionTitle")}</p>
                    <ul>
                        <li>{t("popup.permissionTitleUserRead")}</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl">{t("popup.whatYouNeedToDoHere")}</p>
                    <div>{t("popup.whatYouNeedToDoHereDescription")}</div>
                </div>
            </div>
            <SecurityMan />
        </div>
    );
}
