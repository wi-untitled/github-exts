import { observable, makeObservable, action, when } from "mobx";
import { AppStore } from "src/stores";
import { LoadableStore } from "src/stores/LoadableStore";
import { IFollower, IPageInfo } from "src/types";
import { UserFollowersService } from "src/services";
import { CHUNK_LIMIT } from "src/modules/UserFollowers/constants";

export class UserFollowersStore extends LoadableStore {
    private appStore: AppStore;
    private userFollowersService: UserFollowersService;
    public followers: IFollower[];
    public limit: number;
    public isMoreUserFollowingsLoading: boolean;
    public pageInfo?: IPageInfo;
    public totalCount: number;

    public constructor(
        appStore: AppStore,
        userFollowersService: UserFollowersService,
    ) {
        super();

        makeObservable<UserFollowersStore, "updateMoreUserFollowingsLoading">(
            this,
            {
                isMoreUserFollowingsLoading: observable,
                followers: observable,
                pageInfo: observable,
                totalCount: observable,
                getUserFollowers: action,
                updateFollowers: action,
                updateMoreUserFollowingsLoading: action,
                updatePageInfo: action,
                updateTotalCount: action,
            },
        );

        this.appStore = appStore;
        this.userFollowersService = userFollowersService;
        this.followers = [];
        this.pageInfo = undefined;
        this.limit = CHUNK_LIMIT;
        this.totalCount = 0;
        this.isMoreUserFollowingsLoading = false;

        when(
            () => this.appStore.isOpen && !this.appStore.isLoading,
            async () => {
                if (this.appStore.readyInitAsync) {
                    await this.initAsyncAuth();
                }
            },
        );
    }

    protected initAsyncAuth = async (): Promise<void> => {
        await this.getUserFollowers();
    };

    protected updateMoreUserFollowingsLoading = (
        isMoreUserFollowingsLoading: boolean,
    ): void => {
        this.isMoreUserFollowingsLoading = isMoreUserFollowingsLoading;
    };

    public getUserFollowers = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const { items, pageInfo, totalCount } =
                await this.userFollowersService.getUserFollowers({
                    login: this.appStore.userData.login,
                    first: this.limit,
                    after: null,
                });

            this.updateFollowers(items);
            this.updatePageInfo(pageInfo);
            this.updateTotalCount(totalCount);
        } catch (error) {
            console.error(error);
        } finally {
            this.updateLoading(false);
        }
    };

    public updateFollowers = (followers: IFollower[]): void => {
        this.followers = [...this.followers, ...followers];
    };

    public updatePageInfo = (pageInfo?: IPageInfo): void => {
        this.pageInfo = pageInfo;
    };

    public updateTotalCount = (totalCount: number): void => {
        this.totalCount = totalCount;
    };

    public getMoreUserFollowers = async (): Promise<void> => {
        try {
            if (this.pageInfo?.hasNextPage) {
                this.updateMoreUserFollowingsLoading(true);

                const { items, pageInfo, totalCount } =
                    await this.userFollowersService.getUserFollowers({
                        login: this.appStore.userData.login,
                        first: this.limit,
                        after: this.pageInfo?.endCursor ?? null,
                    });

                this.updateFollowers(items);
                this.updatePageInfo(pageInfo);
                this.updateTotalCount(totalCount);
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
