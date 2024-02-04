import { useTranslation } from "react-i18next";
import { SecurityMan, Link } from "..";

export function Instruction() {
    const { t } = useTranslation();

    return (
        <div className="w-full h-full relative p-4">
            <div className="h-[calc(100%-260px)] overflow-auto space-y-4">
                <Link href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">
                    {t("popup.githubInstruction")}
                </Link>
                <div className="space-y-2">
                    <div>
                        <p className="text-xl">{t("popup.permissionTitle")}</p>
                        <p className="text-xs">
                            {t("popup.permissionTitleUserRead")}
                        </p>
                        <div className="h-px w-full bg-gray-300 dark:bg-gray-700 my-2" />
                    </div>
                    <ul>
                        <li>
                            {t("instruction.privateRepositoriesTitle")}
                            <ul className="list-disc pl-4">
                                <li>
                                    {t(
                                        "instruction.privateRepositoriesCommitStatus",
                                    )}
                                </li>
                                <li>
                                    {t(
                                        "instruction.privateRepositoriesDeploymentStatus",
                                    )}
                                </li>
                                <li>
                                    {t(
                                        "instruction.privateRepositoriesPublicRepositories",
                                    )}
                                </li>
                            </ul>
                        </li>
                        <li>
                            {t("instruction.orgTeamTitle")}
                            <ul className="list-disc pl-4">
                                <li>{t("instruction.orgTeamRead")}</li>
                            </ul>
                        </li>
                        <li>{t("instruction.gistTitle")}</li>
                        <li>
                            {t("instruction.userAllDataTitle")}
                            <ul className="list-disc pl-4">
                                <li>
                                    {t(
                                        "instruction.userAllDataReadProfileData",
                                    )}
                                </li>
                            </ul>
                        </li>
                        <li>
                            {t("instruction.teamDiscussionsTitle")}
                            <ul className="list-disc pl-4">
                                <li>{t("instruction.teamDiscussionsRead")}</li>
                            </ul>
                        </li>
                        <li>
                            {t("instruction.auditLogTitle")}
                            <ul className="list-disc pl-4">
                                <li>{t("instruction.auditLogRead")}</li>
                            </ul>
                        </li>
                        <li>
                            {t("instruction.projectTitle")}
                            <ul className="list-disc pl-4">
                                <li>{t("instruction.projectRead")}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl">{t("popup.whatYouNeedToDoHere")}</p>
                    <div className="h-px w-full bg-gray-300 dark:bg-gray-700 my-2" />
                    <div>{t("popup.whatYouNeedToDoHereDescription")}</div>
                </div>
            </div>
            <SecurityMan />
        </div>
    );
}
