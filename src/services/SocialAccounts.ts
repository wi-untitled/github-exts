import { Octokit } from "octokit";
import { AppService } from "src/services/AppService";
import { SocialAccountsQuery } from "src/services/graphql";
import { ISocialAccountsItem, ISocialAccountsProvider } from "src/types";

export class SocialAccountsService extends AppService {
    public getSocialAccounts = async (): Promise<ISocialAccountsItem[]> => {
        try {
            this.isAuthorized();
            const oktokit = new Octokit({
                auth: this.accessToken,
            });

            const response = await oktokit.graphql<{
                user: {
                    socialAccounts: {
                        edges: {
                            node: {
                                __typename: string;
                                displayName: string;
                                provider: string;
                            };
                        }[];
                    };
                };
            }>(SocialAccountsQuery);

            const socialAccounts = response.user.socialAccounts;

            const mappedSocialAccounts = socialAccounts.edges.map(
                ({ node: { __typename, displayName, provider } }) => {
                    return {
                        type: __typename,
                        name: displayName,
                        provider: provider as ISocialAccountsProvider,
                    };
                },
            );

            return mappedSocialAccounts;
        } catch (error) {
            console.trace(error);

            return [];
        }
    };
}
