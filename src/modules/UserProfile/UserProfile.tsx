import { observer, useLocalStore } from "mobx-react";
import { useService, useStore } from "src/hooks";
import { UserDataStore } from "src/modules/UserProfile/UserProfileStore";
import {
    UserProfileAvatar,
    UserProfileName,
    UserProfileLogin,
} from "src/modules/UserProfile/components";

function UserProfile() {
    const appStore = useStore("AppStore");
    const appService = useService("AppService");
    const userDataStore = useLocalStore(
        () => new UserDataStore(appStore, appService),
    );

    return (
        <div className="w-full flex flex-row space-x-3">
            {userDataStore.isLoading ? (
                <div>loading</div>
            ) : (
                <>
                    <UserProfileAvatar url={userDataStore.user.avatar_url} />
                    <div className="flex flex-col justify-center text-left ">
                        <div className="flex flex-col space-y-0.5">
                            <UserProfileName name={userDataStore.user.name} />
                            <UserProfileLogin
                                login={userDataStore.user.login}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export const UserProfileModule = observer(UserProfile);
