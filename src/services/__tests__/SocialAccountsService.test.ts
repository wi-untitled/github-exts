import { Octokit } from "octokit";
import { SocialAccountsService } from "..";
import { STORAGE_KEYS } from "src/constants";

describe("SocialAccountsService", () => {
    let socialAccountsService: SocialAccountsService;

    beforeEach(() => {
        socialAccountsService = new SocialAccountsService();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("should return mapped social accounts", async () => {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, "1234");

        const login = "test-login";
        const graphqlResponse = {
            user: {
                socialAccounts: {
                    edges: [
                        {
                            node: {
                                __typename: "test-typename",
                                displayName: "test-displayname",
                                provider: "test-provider",
                            },
                        },
                    ],
                },
            },
        };
        const expectedMappedSocialAccounts = [
            {
                type: "test-typename",
                name: "test-displayname",
                provider: "test-provider",
            },
        ];

        vi.spyOn(socialAccountsService, "isAuthorized").mockImplementation(
            () => true,
        );

        Octokit.prototype.graphql.mockResolvedValueOnce(graphqlResponse);

        const mappedSocialAccounts =
            await socialAccountsService.getSocialAccounts({ login });
        expect(mappedSocialAccounts).toEqual(expectedMappedSocialAccounts);
    });

    test("should return an empty array on error", async () => {
        const login = "test-login";

        vi.spyOn(socialAccountsService, "isAuthorized").mockImplementation(
            () => true,
        );

        const mappedSocialAccounts =
            await socialAccountsService.getSocialAccounts({ login });

        expect(mappedSocialAccounts).toEqual([]);
    });
});
