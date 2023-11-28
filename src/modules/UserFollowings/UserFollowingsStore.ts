import { observable, when, makeObservable, action } from "mobx";
import { AppStore } from "../../stores";
import { IFollower } from "../../types";
import { BaseStore } from "../../stores/BaseStore";
import { UserFollowingsService } from "../../services/UserFollowingsService";

export class UserFollowingsStore extends BaseStore {
    private appStore: AppStore;
    private userFollowingsService: UserFollowingsService;
    public followings: IFollower[];
    public limit: number;
    public page: number;
    public totalPage: number;

    public constructor(
        appStore: AppStore,
        userFollowingsService: UserFollowingsService,
    ) {
        super();

        makeObservable(this, {
            followings: observable,
            getUserFollowings: action,
            updateFollowings: action,
        });

        this.appStore = appStore;
        this.userFollowingsService = userFollowingsService;
        this.followings = [];
        this.limit = 9;
        this.page = 1;
        this.totalPage = 0;

        when(
            () => this.appStore.login !== "",
            async () => {
                await this.getUserFollowings();
                this.updateTotalPage();
            },
        );
    }

    public initAsync = async () => {
        await this.getMoreUserFollowings();
    };

    public getUserFollowings = async () => {
        try {
            if (this.appStore.login) {
                const userFollowings =
                    await this.userFollowingsService.getUserFollowings(
                        this.appStore.login,
                        this.limit,
                        this.page,
                    );

                this.updateFollowings(userFollowings);
                this.updateLoading(false);
            }
        } catch (error) {
            console.error(error);
            this.updateLoading(false);
        }
    };

    public updateTotalPage = async () => {
        this.totalPage = this.appStore.userData.following / 10;
    };

    public updateFollowings = (followings: IFollower[]) => {
        this.followings = [...this.followings, ...followings];
    };

    public getMoreUserFollowings = async () => {
        console.log(55);
        try {
            if (this.page < this.totalPage && this.appStore.login) {
                this.page = this.page + 1;
                const userFollowings =
                    await this.userFollowingsService.getUserFollowings(
                        this.appStore.login,
                        this.limit,
                        this.page,
                    );

                this.updateFollowings(userFollowings);
            }
        } catch (error) {
            console.error(error);
        }
    };

    public get showMore() {
        return this.followings.length !== this.appStore.userData.followings;
    }
}
