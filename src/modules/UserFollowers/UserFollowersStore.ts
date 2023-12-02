import { observable, makeObservable, action, when } from "mobx";
import { AppStore } from "src/stores";
import { IFollower } from "src/types";
import { BaseStore } from "src/stores/BaseStore";
import { UserFollowersService } from "src/services";
import { CHUNK_LIMIT } from "src/modules/UserFollowers/constants";

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
        await this.getUserFollowers();
    };

    public getUserFollowers = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const userFollowers =
                await this.userFollowersService.getUserFollowers(
                    this.limit,
                    this.page,
                );

            this.updateFollowers(userFollowers);
            this.updateTotalPage();
            this.updateLoading(false);
        } catch (error) {
            console.error(error);
            this.updateLoading(false);
        }
    };

    public updateTotalPage = (): void => {
        this.totalPage = this.appStore.userData.followers / this.limit;
    };

    public updateFollowers = (followers: IFollower[]): void => {
        this.followers = [...this.followers, ...followers];
    };

    public getMoreUserFollowers = async (): Promise<void> => {
        try {
            if (this.page < this.totalPage) {
                this.page = this.page + 1;

                const userFollowers =
                    await this.userFollowersService.getUserFollowers(
                        this.limit,
                        this.page,
                    );

                this.updateFollowers(userFollowers);
            }
        } catch (error) {
            console.error(error);
        }
    };

    public get showMore(): boolean {
        return this.followers.length !== this.appStore.userData.followers;
    }
}
