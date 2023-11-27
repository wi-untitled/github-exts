import { action, makeObservable, observable } from "mobx";
import { AppStore } from "../../stores";
import { AppService } from "../../services";
import { IUserData } from "../../types";
import { BaseStore } from "../../stores/BaseStore";

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

    public initAsync = async () => {
        try {
            if (!this.appStore.isAuthorized) {
                throw Error("User is not authed.");
            }

            this.updateLoading(true);

            const user = await this.appService.getUserData();

            this.updateUser(user);
            this.updateLoading(false);
        } catch (error) {
            console.error(error);
            this.updateLoading(false);
        }
    };

    public updateUser = (user: IUserData) => {
        this.user = user;
    };
}
