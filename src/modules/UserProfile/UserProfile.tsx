import { observer, useLocalStore } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Spinner } from "src/components";
import { useService, useStore } from "src/hooks";
import { UserProfileStore } from "src/modules/UserProfile/UserProfileStore";
import {
    UserProfileAvatar,
    UserProfileName,
    UserProfileLogin,
} from "src/modules/UserProfile/components";
import { FeatureFlag } from "src/core";
import { useNavigate } from "react-router-dom";
import { SettingsScreen } from "src/screens";
import { Icon } from "src/components";
import { useCallback } from "react";

function UserProfile() {
    const appStore = useStore("AppStore");
    const userProfileService = useService("UserProfileService");

    const userProfileStore = useLocalStore(
        () => new UserProfileStore(appStore, userProfileService),
    );
    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleRedirectToSettingPageCallback = () => {
        navigate(SettingsScreen.routeName);
    };

    const handleSpaceKeyUpCallback = useCallback(
        (_: React.KeyboardEvent<HTMLDivElement>) => {
            return undefined;
        },
        [],
    );

    return (
        <div
            className="w-full flex items-center bg px-4 py-2 bg-light dark:bg-dark text-light dark:text-dark border-b border-light dark:border-dark relative"
            style={{ minHeight: "57px" }}
        >
            {userProfileStore.isLoading ? (
                <Spinner absoluteFill />
            ) : (
                <div className="flex flex-row space-x-3 items-center w-full">
                    {userProfileStore.user?.avatar_url ? (
                        <UserProfileAvatar
                            url={userProfileStore.user.avatar_url}
                        />
                    ) : null}
                    <div className="flex flex-col justify-center text-left flex-1">
                        {userProfileStore.error ? (
                            <div>{t("errors.badCredentinals")}</div>
                        ) : (
                            <div className="flex flex-col space-y-0.5">
                                <UserProfileName
                                    name={userProfileStore.user.name}
                                />
                                <UserProfileLogin
                                    login={userProfileStore.user.login}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row space-x-2">
                        <FeatureFlag name="enableSettingsPage">
                            <span
                                className="cursor-pointer"
                                onClick={handleRedirectToSettingPageCallback}
                            >
                                <Icon
                                    icon="settings"
                                    className="w-6 h-6 dark:text-dark text-accent"
                                />
                            </span>
                        </FeatureFlag>
                        <span
                            className="cursor-pointer"
                            onClick={userProfileStore.handleLogout}
                            onKeyUp={handleSpaceKeyUpCallback}
                            role="logout"
                        >
                            <Icon
                                icon="logout"
                                className="w-6 h-6 dark:text-dark text-accent"
                            />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export const UserProfileModule = observer(UserProfile);
