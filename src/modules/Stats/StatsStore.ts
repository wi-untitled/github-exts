import { makeObservable, observable, action, autorun } from "mobx";
import { StatsService } from "src/services";
import { AppStore } from "src/stores";
import { LoadableStore } from "src/stores/LoadableStore";

export const DEFAULT_ZERO_VALUE = 0;

export class StatsStore extends LoadableStore {
    protected appStore: AppStore;
    protected statsService: StatsService;

    public totalIssues: number;
    public totalMergedPullRequests: number;
    public totalPullRequests: number;
    public totalRepositoriesContributedTo: number;
    public totalRepositoryDiscussionComments: number;
    public totalRepositoryDiscussions: number;
    public totalStars: number;

    public constructor(appStore: AppStore, statsService: StatsService) {
        super();

        makeObservable<StatsStore, "updateData">(this, {
            totalIssues: observable,
            totalMergedPullRequests: observable,
            totalPullRequests: observable,
            totalRepositoriesContributedTo: observable,
            totalRepositoryDiscussionComments: observable,
            totalRepositoryDiscussions: observable,
            totalStars: observable,
            updateData: action,
        });

        this.appStore = appStore;
        this.statsService = statsService;

        this.totalIssues = DEFAULT_ZERO_VALUE;
        this.totalMergedPullRequests = DEFAULT_ZERO_VALUE;
        this.totalPullRequests = DEFAULT_ZERO_VALUE;
        this.totalRepositoriesContributedTo = DEFAULT_ZERO_VALUE;
        this.totalRepositoryDiscussionComments = DEFAULT_ZERO_VALUE;
        this.totalRepositoryDiscussions = DEFAULT_ZERO_VALUE;
        this.totalStars = DEFAULT_ZERO_VALUE;

        autorun(async () => {
            if (this.appStore.readyInitAsync) {
                await this.initAsync();
            }
        });
    }

    public initAsync = async (): Promise<void> => {
        try {
            await this.getStats();
        } catch (error) {
            console.error(error);
        }
    };

    public getStats = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const result = await this.statsService.getStats({
                login: this.appStore.userData.login,
                includeDiscussions: true,
                includeMergedPullRequests: true,
            });

            this.updateData({ ...result });
        } catch (error) {
            console.log(error);
        } finally {
            this.updateLoading(false);
        }
    };

    protected updateData = ({
        totalIssues,
        totalMergedPullRequests,
        totalPullRequests,
        totalRepositoriesContributedTo,
        totalRepositoryDiscussionComments,
        totalRepositoryDiscussions,
        totalStars,
    }: {
        totalIssues?: number;
        totalMergedPullRequests?: number;
        totalPullRequests?: number;
        totalRepositoriesContributedTo?: number;
        totalRepositoryDiscussionComments?: number;
        totalRepositoryDiscussions?: number;
        totalStars?: number;
    }): void => {
        this.totalIssues = totalIssues ?? this.totalIssues;
        this.totalMergedPullRequests =
            totalMergedPullRequests ?? this.totalMergedPullRequests;
        this.totalPullRequests = totalPullRequests ?? this.totalPullRequests;
        this.totalRepositoriesContributedTo =
            totalRepositoriesContributedTo ??
            this.totalRepositoriesContributedTo;
        this.totalRepositoryDiscussionComments =
            totalRepositoryDiscussionComments ??
            this.totalRepositoryDiscussionComments;
        this.totalRepositoryDiscussions =
            totalRepositoryDiscussions ?? this.totalRepositoryDiscussions;
        this.totalStars = totalStars ?? this.totalStars;
    };
}
