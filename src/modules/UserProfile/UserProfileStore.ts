import { action, makeObservable, observable, when } from "mobx";
import { AppStore } from "src/stores";
import { LoadableStore } from "src/stores/LoadableStore";
import { UserProfileService } from "src/services";
import { IUserData } from "src/types";

export class UserProfileStore extends LoadableStore {
    public appStore: AppStore;
    public userProfileService: UserProfileService;
    public user: IUserData;

    public constructor(
        appStore: AppStore,
        userProfileService: UserProfileService,
    ) {
        super();

        makeObservable<UserProfileStore, "updateUser">(this, {
            user: observable,
            updateUser: action,
        });

        this.appStore = appStore;
        this.userProfileService = userProfileService;

        when(
            () => this.appStore.isAuthorized,
            async () => {
                await this.initAsync();
            },
        );
    }

    protected initAsync = async (): Promise<void> => {
        try {
            if (!this.appStore.isAuthorized) {
                throw Error("User is not authed.");
            }

            this.updateLoading(true);

            const user = await this.userProfileService.getUserData();

            this.updateUser(user);
            this.updateLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            this.updateLoading(false);
        }
    };

    protected updateUser = (user: IUserData): void => {
        this.user = user;
    };

    public handleLogout = (): void => {
        this.appStore.handleLogout();
    };
}
