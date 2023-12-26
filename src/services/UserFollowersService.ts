import { Octokit } from "octokit";
import { IPageInfo, IResponseFollower } from "src/types";
import { AppService } from "src/services/AppService";
import { UserFollowerQuery } from "src/services/graphql";

export class UserFollowersService extends AppService {
    public constructor() {
        super();
    }

    public getUserFollowers = async ({
        login,
        first,
        after,
    }: {
        login: string;
        first: number;
        after: string | null;
    }): Promise<{
        items: IResponseFollower[];
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
                    followers: {
                        totalCount: number;
                        pageInfo: IPageInfo;
                        nodes: IResponseFollower[];
                    };
                };
            }>({
                query: UserFollowerQuery,
                login: login,
                first: first,
                after: after,
            });

            const items = response.user.followers.nodes;
            const pageInfo = response.user.followers.pageInfo;
            const totalCount = response.user.followers.totalCount;

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
