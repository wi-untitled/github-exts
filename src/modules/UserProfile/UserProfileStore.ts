import { action, makeObservable, observable, when } from "mobx";
import { AppStore } from "src/stores";
import { UserProfileService } from "src/services";
import { IUserData } from "src/types";
import { BaseStore } from "src/stores/BaseStore";

export class UserDataStore extends BaseStore {
    private appStore: AppStore;
    public userProfileService: UserProfileService;
    public user: IUserData;

    public constructor(
        appStore: AppStore,
        userProfileService: UserProfileService,
    ) {
        super();

        makeObservable(this, {
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

    public initAsync = async (): Promise<void> => {
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
            this.updateLoading(false);
        }
    };

    public updateUser = (user: IUserData): void => {
        this.user = user;
    };

    public handleLogout = (): void => {
        this.appStore.handleLogout();
    };
}
