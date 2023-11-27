import { observable, when, makeObservable, action } from "mobx";
import { AppService } from "../../services";
import { AppStore } from "../../stores";
import { IFollower } from "../../types";
import { BaseStore } from "../../stores/BaseStore";

export class UserFollowersStore extends BaseStore {
    private appStore: AppStore;
    private appService: AppService;
    public followers: IFollower[];

    public constructor(appStore: AppStore, appService: AppService) {
        super();

        makeObservable(this, {
            followers: observable,

            getUserFollowers: action,
        });

        this.appStore = appStore;
        this.appService = appService;
        this.followers = [];

        when(
            () => this.appStore.login !== "",
            async () => {
                await this.getUserFollowers();
            },
        );
    }

    public initAsync = async () => {
        await this.getUserFollowers();
    };

    public getUserFollowers = async () => {
        try {
            if (this.appStore.login) {
                const userFollowers = await this.appService.getUserFollowers(
                    this.appStore.login,
                );

                this.followers = userFollowers;
                this.updateLoading(false);
            }
        } catch (error) {
            console.error(error);
            this.updateLoading(false);
        }
    };
}
