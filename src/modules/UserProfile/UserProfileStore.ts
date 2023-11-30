import { action, makeObservable, observable } from "mobx";
import { AppStore } from "src/stores";
import { AppService } from "src/services";
import { IUserData } from "src/types";
import { BaseStore } from "src/stores/BaseStore";

export class UserDataStore extends BaseStore {
    private appStore: AppStore;
    private appService: AppService;
    public user: IUserData;

    public constructor(appStore: AppStore, appService: AppService) {
        super();

        makeObservable(this, {
            user: observable,
            updateUser: action,
        });

        this.appStore = appStore;
        this.appService = appService;
        this.isLoading = true;

        this.initAsync();
    }

    public initAsync = async (): Promise<void> => {
        try {
            if (!this.appStore.isAuthorized) {
                throw Error("User is not authed.");
            }

            this.updateLoading(true);

            const user = await this.appStore.userData;

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
}
