import { Octokit } from "octokit";
import { IPageInfo, IResponseFollowing } from "src/types";
import { AppService } from "src/services";
import { UserFollowingQuery } from "src/services/graphql";

export class UserFollowingsService extends AppService {
    public constructor() {
        super();
    }

    public getUserFollowings = async ({
        login,
        first,
        after,
    }: {
        login: string;
        first: number;
        after: string | null;
    }): Promise<{
        items: IResponseFollowing[];
        pageInfo?: IPageInfo;
        totalCount: number;
    }> => {
        try {
            this.isAuthorized();

            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const response = await oktokit.graphql<{
                user: {
                    following: {
                        totalCount: number;
                        pageInfo: IPageInfo;
                        nodes: IResponseFollowing[];
                    };
                };
            }>({
                query: UserFollowingQuery,
                login: login,
                first: first,
                after: after,
            });

            const items = response.user.following.nodes;
            const pageInfo = response.user.following.pageInfo;
            const totalCount = response.user.following.totalCount;

            return {
                items: items,
                pageInfo: pageInfo,
                totalCount: totalCount,
            };
        } catch (error) {
            console.trace(error);

            return {
                items: [],
                totalCount: 0,
                pageInfo: {
                    hasNextPage: false,
                    endCursor: "",
                },
            };
        }
    };
}
