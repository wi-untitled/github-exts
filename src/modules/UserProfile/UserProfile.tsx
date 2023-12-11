import { observer, useLocalStore } from "mobx-react";
import { Icon } from "src/components";
import Spinner from "src/components/Spinner";
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

function UserProfile() {
    const appStore = useStore("AppStore");
    const userProfileService = useService("UserProfileService");
    const userProfileStore = useLocalStore(
        () => new UserProfileStore(appStore, userProfileService),
    );
    const navigate = useNavigate();

    const handleRedirectToSettingPageCallback = () => {
        navigate(SettingsScreen.routeName);
    };

    return (
        <div
            className="w-full bg px-4 py-2 bg-gray-100 dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 relative"
            style={{ minHeight: "57px" }}
        >
            {userProfileStore.isLoading ? (
                <Spinner absoluteFill />
            ) : (
                <div className="flex flex-row space-x-3 items-center">
                    <UserProfileAvatar url={userProfileStore.user.avatar_url} />
                    <div className="flex flex-col justify-center text-left flex-1">
                        <div className="flex flex-col space-y-0.5">
                            <UserProfileName
                                name={userProfileStore.user.name}
                            />
                            <UserProfileLogin
                                login={userProfileStore.user.login}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <FeatureFlag name="settingsPage">
                            <span
                                className="cursor-pointer"
                                onClick={handleRedirectToSettingPageCallback}
                            >
                                <Icon
                                    icon="settings"
                                    className="w-6 h-6 text-gray-400 dark:text-gray-500"
                                />
                            </span>
                        </FeatureFlag>
                        <span
                            className="cursor-pointer"
                            onClick={userProfileStore.handleLogout}
                        >
                            <Icon
                                icon="logout"
                                className="w-6 h-6 text-gray-400 dark:text-gray-500"
                            />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export const UserProfileModule = observer(UserProfile);
