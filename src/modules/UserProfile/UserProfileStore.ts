import { action, autorun, makeObservable, observable } from "mobx";
import { AppStore } from "src/stores";
import { LoadableStore } from "src/stores/LoadableStore";
import { UserProfileService } from "src/services";
import { IUserData } from "src/types";
import { BadCredentinals } from "src/errors";

export class UserProfileStore extends LoadableStore {
    public appStore: AppStore;
    public userProfileService: UserProfileService;
    public user: IUserData;
    public error?: Error;

    public constructor(
        appStore: AppStore,
        userProfileService: UserProfileService,
    ) {
        super();

        makeObservable<UserProfileStore, "updateUser" | "updateError">(this, {
            user: observable,
            error: observable,
            updateUser: action,
            updateError: action,
        });

        this.appStore = appStore;
        this.userProfileService = userProfileService;

        this.error = undefined;

        autorun(async () => {
            if (this.appStore.readyInitAsync) {
                console.log("initAsync");
                await this.initAsync();
            }
        });
    }

    protected initAsync = async (): Promise<void> => {
        try {
            if (!this.appStore.isAuthorized) {
                throw Error("User is not authed.");
            }

            this.updateLoading(true);

            const userOrError = await this.userProfileService.getUserData();

            if (userOrError instanceof BadCredentinals) {
                this.updateError(userOrError);
            } else {
                this.updateUser(userOrError);
            }

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

    protected updateError = (error: Error): void => {
        this.error = error;
    };

    public handleLogout = (): void => {
        this.appStore.handleLogout();
    };
}
