import { observable, makeObservable, action, when } from "mobx";
import { AppStore } from "src/stores";
import { IFollower } from "src/types";
import { BaseStore } from "src/stores/BaseStore";
import { UserFollowingsService } from "src/services";
import { CHUNK_LIMIT } from "./constants";

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
        this.limit = CHUNK_LIMIT;
        this.page = 1;
        this.totalPage = 0;

        when(
            () => this.appStore.isAuthorized && !this.appStore.isLoading,
            async () => {
                await this.initAsyncAuth();
            },
        );
    }

    protected initAsyncAuth = async (): Promise<void> => {
        await this.getUserFollowings();
    };

    public getUserFollowings = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const userFollowings =
                await this.userFollowingsService.getUserFollowings(
                    this.limit,
                    this.page,
                );

            this.updateFollowings(userFollowings);
            this.updateTotalPage();
            this.updateLoading(false);
        } catch (error) {
            console.error(error);
            this.updateLoading(false);
        }
    };

    public updateTotalPage = async (): Promise<void> => {
        this.totalPage = this.appStore.userData.following / this.limit;
    };

    public updateFollowings = (followings: IFollower[]): void => {
        this.followings = [...this.followings, ...followings];
    };

    public getMoreUserFollowings = async (): Promise<void> => {
        try {
            if (this.page < this.totalPage) {
                this.page = this.page + 1;

                const userFollowings =
                    await this.userFollowingsService.getUserFollowings(
                        this.limit,
                        this.page,
                    );

                this.updateFollowings(userFollowings);
            }
        } catch (error) {
            console.error(error);
        }
    };

    public get showMore(): boolean {
        return this.followings.length !== this.appStore.userData.followings;
    }
}
