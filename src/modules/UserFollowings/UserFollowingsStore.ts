import { observable, makeObservable, action, when } from "mobx";
import { AppStore } from "src/stores";
import { IFollower, IPageInfo } from "src/types";
import { BaseStore } from "src/stores/BaseStore";
import { UserFollowingsService } from "src/services";
import { CHUNK_LIMIT } from "./constants";

export class UserFollowingsStore extends BaseStore {
    private appStore: AppStore;
    private userFollowingsService: UserFollowingsService;
    public followings: IFollower[];
    public limit: number;
    public isMoreUserFollowingsLoading: boolean;
    public pageInfo?: IPageInfo;
    public totalCount: number;

    public constructor(
        appStore: AppStore,
        userFollowingsService: UserFollowingsService,
    ) {
        super();

        makeObservable<UserFollowingsStore, "updateMoreUserFollowingsLoading">(
            this,
            {
                isMoreUserFollowingsLoading: observable,
                followings: observable,
                pageInfo: observable,
                totalCount: observable,
                getUserFollowings: action,
                updateFollowings: action,
                updateMoreUserFollowingsLoading: action,
                updatePageInfo: action,
                updateTotalCount: action,
            },
        );

        this.appStore = appStore;
        this.userFollowingsService = userFollowingsService;
        this.followings = [];
        this.limit = CHUNK_LIMIT;
        this.pageInfo = undefined;
        this.totalCount = 0;
        this.isMoreUserFollowingsLoading = false;

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

    protected updateMoreUserFollowingsLoading = (
        isMoreUserFollowingsLoading: boolean,
    ): void => {
        this.isMoreUserFollowingsLoading = isMoreUserFollowingsLoading;
    };

    public getUserFollowings = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const { items, pageInfo, totalCount } =
                await this.userFollowingsService.getUserFollowings({
                    login: this.appStore.userData.login,
                    first: this.limit,
                    after: null,
                });

            this.updateFollowings(items);
            this.updatePageInfo(pageInfo);
            this.updateTotalCount(totalCount);
            this.updateLoading(false);
        } catch (error) {
            console.error(error);
            this.updateLoading(false);
        }
    };

    public updateFollowings = (followings: IFollower[]): void => {
        this.followings = [...this.followings, ...followings];
    };

    public updatePageInfo = (pageInfo?: IPageInfo): void => {
        this.pageInfo = pageInfo;
    };

    public updateTotalCount = (totalCount: number): void => {
        this.totalCount = totalCount;
    };

    public getMoreUserFollowings = async (): Promise<void> => {
        try {
            if (this.pageInfo?.hasNextPage) {
                this.updateMoreUserFollowingsLoading(true);

                const { items, pageInfo, totalCount } =
                    await this.userFollowingsService.getUserFollowings({
                        login: this.appStore.userData.login,
                        first: this.limit,
                        after: this.pageInfo?.endCursor || null,
                    });

                this.updateFollowings(items);
                this.updatePageInfo(pageInfo);
                this.updateTotalCount(totalCount);
                this.updateMoreUserFollowingsLoading(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.updateMoreUserFollowingsLoading(false);
        }
    };

    public get showMore(): boolean {
        return this.pageInfo?.hasNextPage ?? false;
    }

    public get canLoadMore(): boolean {
        return this.totalCount > CHUNK_LIMIT;
    }
}
