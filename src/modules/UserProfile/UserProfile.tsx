import { observer, useLocalStore } from "mobx-react";
import { useService, useStore } from "../../hooks";
import { UserDataStore } from "./UserProfileStore";
import { UserProfileAvatar, UserProfileName } from "./components";

function UserProfile() {
    const appStore = useStore("AppStore");
    const appService = useService("AppService");
    const userDataStore = useLocalStore(
        () => new UserDataStore(appStore, appService),
    );

    return (
        <div className="w-full flex flex-col items-center space-y-2">
            {userDataStore.isLoading ? (
                <div>loading</div>
            ) : (
                <>
                    <div>
                        <UserProfileAvatar
                            url={userDataStore.user.avatar_url}
                        />
                        <UserProfileName name={userDataStore.user.name} />
                    </div>
                </>
            )}
        </div>
    );
}

export const UserProfileModule = observer(UserProfile);
