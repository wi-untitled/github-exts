import { UserFollowersService } from "../UserFollowersService";

describe("UserFollowersService", () => {
    let userFollowersService: UserFollowersService;

    beforeEach(() => {
        userFollowersService = new UserFollowersService();
    });

    describe("getUserFollowers", () => {
        it("should return user followers data when successful", async () => {
            // Arrange
            const login = "username";
            const first = 20;
            const after = "cursor";
            const expectedResponse = {
                items: [],
                pageInfo: {
                    hasNextPage: false,
                    endCursor: "",
                },
                totalCount: 0,
            };

            // Act
            const result = await userFollowersService.getUserFollowers({
                login,
                first,
                after,
            });

            // Assert
            expect(result).toEqual(expectedResponse);
        });

        it("should return an empty array when an error occurs", async () => {
            // Arrange
            const login = "username";
            const first = 20;
            const after = "cursor";
            const expectedResponse = {
                items: [],
                totalCount: 0,
                pageInfo: {
                    hasNextPage: false,
                    endCursor: "",
                },
            };
            vi.spyOn(userFollowersService, "isAuthorized").mockImplementation(
                () => {
                    // Throw an error to simulate authorization failure
                    throw new Error("Authorization failed");
                },
            );

            // Act
            const result = await userFollowersService.getUserFollowers({
                login,
                first,
                after,
            });

            // Assert
            expect(result).toEqual(expectedResponse);
        });
    });
});
