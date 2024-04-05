import { observer, useLocalStore } from "mobx-react";
import { useService, useStore } from "src/hooks";
import { SocialAccountsStore } from "./SocialAccountsStore";
import { Widget, NoResult } from "src/components";
import { useTranslation } from "react-i18next";
import { iconRender } from "./constants";

export function SocialAccounts() {
    const appStore = useStore("AppStore");
    const socialAccountsService = useService("SocialAccountsService");
    const socialAccountsStore = useLocalStore(
        () => new SocialAccountsStore(appStore, socialAccountsService),
    );
    const { t } = useTranslation();

    return (
        <Widget
            title={t("socialAccounts.title")}
            isLoading={socialAccountsStore.isLoading}
        >
            {socialAccountsStore.socialAccounts.length === 0 ? (
                <NoResult message={t("socialAccounts.noResult")} />
            ) : (
                <div className="p-3 space-x-2 flex">
                    {socialAccountsStore.socialAccounts.map(
                        ({ name, provider }) => {
                            /**
                             * Ignores others cause there is no icons.
                             * Uncomment when icons are ready.
                             */
                            const Render = iconRender[provider];

                            if (!Render) {
                                return null;
                            }

                            return (
                                <div
                                    key={name}
                                    className="block rounded-full overflow-hidden w-6 h-6 fill-current text-accent dark:text-zinc-600 hover:rotate-90 transition duration-500 ease-in-out"
                                >
                                    <Render name={name} />
                                </div>
                            );
                        },
                    )}
                </div>
            )}
        </Widget>
    );
}

export const SocialAccountsModule = observer(SocialAccounts);
