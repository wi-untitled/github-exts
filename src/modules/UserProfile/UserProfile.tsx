import { observer, useLocalStore } from "mobx-react";
import { IconLogout } from "src/components";
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
        <div className="w-full flex flex-row space-x-3 items-center">
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
                        className="w-8 h-8 cursor-pointer"
                    >
                        <IconLogout />
                    </div>
                </>
            )}
        </div>
    );
}

export const UserProfileModule = observer(UserProfile);
