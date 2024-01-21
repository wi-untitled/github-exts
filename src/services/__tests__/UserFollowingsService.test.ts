import { Octokit } from "octokit";
import { UserFollowingsService } from "../UserFollowingsService";

describe("UserFollowingsService", () => {
    test("should get user followings", async () => {
        const userFollowingsService = new UserFollowingsService();

        vi.spyOn(userFollowingsService, "isAuthorized").mockImplementation(
            () => true,
        );

        const login = "testuser";
        const first = 10;
        const after = null;

        const expectedResponse = {
            items: [
                {
                    id: 1,
                    username: "user1",
                },
                {
                    id: 2,
                    username: "user2",
                },
            ],
            pageInfo: {
                hasNextPage: false,
                endCursor: "",
            },
            totalCount: 2,
        };

        Octokit.prototype.graphql.mockResolvedValueOnce({
            user: {
                following: {
                    totalCount: expectedResponse.totalCount,
                    pageInfo: expectedResponse.pageInfo,
                    nodes: expectedResponse.items,
                },
            },
        });

        const response = await userFollowingsService.getUserFollowings({
            login,
            first,
            after,
        });

        expect(response).toEqual(expectedResponse);
    });

    test("should handle error and return an empty response", async () => {
        const userFollowingsService = new UserFollowingsService();

        const login = "testuser";
        const first = 10;
        const after = null;

        Octokit.prototype.graphql.mockRejectedValueOnce(
            new Error("Something went wrong"),
        );

        const response = await userFollowingsService.getUserFollowings({
            login,
            first,
            after,
        });

        expect(response).toEqual({
            items: [],
            totalCount: 0,
            pageInfo: {
                hasNextPage: false,
                endCursor: "",
            },
        });
    });
});
