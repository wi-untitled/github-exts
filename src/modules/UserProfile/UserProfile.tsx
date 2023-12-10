import { observer, useLocalStore } from "mobx-react";
import { Icon } from "src/components";
import { useService, useStore } from "src/hooks";
import { UserProfileStore } from "src/modules/UserProfile/UserProfileStore";
import {
    UserProfileAvatar,
    UserProfileName,
    UserProfileLogin,
} from "src/modules/UserProfile/components";

function UserProfile() {
    const appStore = useStore("AppStore");
    const userProfileService = useService("UserProfileService");
    const userProfileStore = useLocalStore(
        () => new UserProfileStore(appStore, userProfileService),
    );

    return (
        <div
            className="w-full flex flex-row space-x-3 items-center bg px-4 py-2 bg-gray-100 dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800"
            style={{
                minHeight: "57px",
            }}
        >
            {userProfileStore.isLoading ? (
                <div>loading</div>
            ) : (
                <>
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
                    <div
                        onClick={userProfileStore.handleLogout}
                        className="cursor-pointer"
                    >
                        <Icon
                            icon="logout"
                            className="w-6 h-6 text-gray-400 dark:text-gray-500"
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export const UserProfileModule = observer(UserProfile);
