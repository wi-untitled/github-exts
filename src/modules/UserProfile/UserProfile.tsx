import { observer, useLocalStore } from "mobx-react";
import { IconLogout } from "src/components";
import { useService, useStore } from "src/hooks";
import { UserDataStore } from "src/modules/UserProfile/UserProfileStore";
import {
    UserProfileAvatar,
    UserProfileName,
    UserProfileLogin,
} from "src/modules/UserProfile/components";

function UserProfile() {
    const appStore = useStore("AppStore");
    const userProfileService = useService("UserProfileService");
    const userDataStore = useLocalStore(
        () => new UserDataStore(appStore, userProfileService),
    );

    return (
        <div className="w-full flex flex-row space-x-3 items-center">
            {userDataStore.isLoading ? (
                <div>loading</div>
            ) : (
                <>
                    <UserProfileAvatar url={userDataStore.user.avatar_url} />
                    <div className="flex flex-col justify-center text-left flex-1">
                        <div className="flex flex-col space-y-0.5">
                            <UserProfileName name={userDataStore.user.name} />
                            <UserProfileLogin
                                login={userDataStore.user.login}
                            />
                        </div>
                    </div>
                    <div
                        onClick={userDataStore.handleLogout}
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
