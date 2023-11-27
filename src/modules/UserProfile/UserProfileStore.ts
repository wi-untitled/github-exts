import { makeAutoObservable } from "mobx";
import { AppStore } from "../../stores";
import { AppService } from "../../services";
import { IUserData } from "../../types";

export class UserDataStore {
    private appStore: AppStore;
    private appService: AppService;
    public user: IUserData;
    public isLoading: boolean;

    public constructor(appStore: AppStore, appService: AppService) {
        makeAutoObservable(this, {});

        this.appStore = appStore;
        this.appService = appService;
        this.isLoading = true;

        this.initAsync();
    }

    public initAsync = async () => {
        try {
            if (!this.appStore.isAuthorized) {
                throw Error("User is not authed.")
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

    public updateLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };

    public updateUser = (user: IUserData) => {
        this.user = user;
    };
}
