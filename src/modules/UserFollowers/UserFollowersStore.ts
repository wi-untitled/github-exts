import { observable, when, makeObservable, action } from "mobx";
import { AppStore } from "../../stores";
import { IFollower } from "../../types";
import { BaseStore } from "../../stores/BaseStore";
import { UserFollowersService } from "../../services/UserFollowersService";

export class UserFollowersStore extends BaseStore {
    private appStore: AppStore;
    private userFollowersService: UserFollowersService;
    public followers: IFollower[];
    public limit: number;
    public page: number;
    public totalPage: number;

    public constructor(
        appStore: AppStore,
        userFollowersService: UserFollowersService,
    ) {
        super();

        makeObservable(this, {
            followers: observable,
            getUserFollowers: action,
            updateFollowers: action,
        });

        this.appStore = appStore;
        this.userFollowersService = userFollowersService;
        this.followers = [];
        this.limit = 9;
        this.page = 1;
        this.totalPage = 0;

        when(
            () => this.appStore.login !== "",
            async () => {
                await this.getUserFollowers();
                this.updateTotalPage();
            },
        );
    }

    public initAsync = async () => {
        await this.getUserFollowers();
    };

    public getUserFollowers = async () => {
        try {
            if (this.appStore.login) {
                const userFollowers =
                    await this.userFollowersService.getUserFollowers(
                        this.appStore.login,
                        this.limit,
                        this.page,
                    );

                this.updateFollowers(userFollowers);
                this.updateLoading(false);
            }
        } catch (error) {
            console.error(error);
            this.updateLoading(false);
        }
    };

    public updateTotalPage = async () => {
        this.totalPage = this.appStore.userData.followers / 10;
    };

    public updateFollowers = (followers: IFollower[]) => {
        this.followers = [...this.followers, ...followers];
    };

    public getMoreUserFollowers = async () => {
        try {
            if (this.page < this.totalPage && this.appStore.login) {
                this.page = this.page + 1;
                const userFollowers =
                    await this.userFollowersService.getUserFollowers(
                        this.appStore.login,
                        this.limit,
                        this.page,
                    );

                this.updateFollowers(userFollowers);
            }
        } catch (error) {
            console.error(error);
        }
    };

    public get showMore() {
        return this.followers.length !== this.appStore.userData.followers;
    }
}
