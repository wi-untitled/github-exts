import { makeObservable, observable, when, action } from "mobx";
import { SocialAccountsService } from "src/services";
import { AppStore } from "src/stores";
import { BaseStore } from "src/stores/BaseStore";
import { ISocialAccountsItem } from "src/types";

export class SocialAccountsStore extends BaseStore {
    public socialAccounts: ISocialAccountsItem[];
    private socialAccountsService: SocialAccountsService;
    protected appStore: AppStore;

    public constructor(
        appStore: AppStore,
        socialAccountsService: SocialAccountsService,
    ) {
        super();

        this.socialAccountsService = socialAccountsService;

        makeObservable<SocialAccountsStore, "setSocialAccounts">(this, {
            socialAccounts: observable,
            setSocialAccounts: action,
        });

        this.socialAccounts = [];

        this.appStore = appStore;
        this.socialAccountsService = socialAccountsService;

        when(
            () => this.appStore.isAuthorized && !this.appStore.isLoading,
            async () => {
                await this.initAsync();
            },
        );
    }

    protected initAsync = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const socialAccounts =
                await this.socialAccountsService.getSocialAccounts();

            this.setSocialAccounts(socialAccounts);
        } catch (error) {
            console.error(error);
        } finally {
            this.updateLoading(false);
        }
    };

    protected setSocialAccounts = (socialAccounts: ISocialAccountsItem[]) => {
        this.socialAccounts = socialAccounts;
    };
}
