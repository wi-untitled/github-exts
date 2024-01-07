import { action, computed, makeObservable, observable, when } from "mobx";
import { TopLanguagesService } from "src/services";
import { AppStore } from "src/stores";
import { LoadableStore } from "src/stores/LoadableStore";
import { ITopLanguage, ITopLanguageWithMaxSize } from "src/types";

export class TopLanguagesStore extends LoadableStore {
    protected appStore: AppStore;
    protected topLanguagesService: TopLanguagesService;
    public topLanguages: [string, ITopLanguage][];

    public constructor(
        appStore: AppStore,
        topLanguagesService: TopLanguagesService,
    ) {
        super();

        makeObservable<TopLanguagesStore, "setTopLanguages">(this, {
            topLanguages: observable,
            setTopLanguages: action,
            data: computed,
        });

        this.appStore = appStore;
        this.topLanguagesService = topLanguagesService;
        this.topLanguages = [];

        when(
            () => this.appStore.isAuthorized && !this.appStore.isLoading,
            async () => {
                await this.initAsync();
            },
        );
    }

    protected initAsync = async (): Promise<void> => {
        await this.getTopLanguages();
    };

    public getTopLanguages = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const topLanguages = await this.topLanguagesService.getTopLanguages(
                this.appStore.userData.login,
            );

            this.setTopLanguages(topLanguages);
            this.updateLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    protected setTopLanguages = (topLanguages: any): void => {
        this.topLanguages = topLanguages;
    };

    public get topFive(): [string, ITopLanguage][] {
        const topFive = this.topLanguages.slice(0, 5);

        return topFive;
    }

    public get topFiveBySize(): number[] {
        const topFive = this.topFive.map(([_, { size }]) => size);

        return topFive;
    }

    public get medium(): number {
        const medium = this.topFiveBySize.reduce(
            (acc, x: number) => acc + x / 5,
            0,
        );

        return medium;
    }

    public get data(): ITopLanguageWithMaxSize[] {
        return this.topFive.map(([_, { name, color, size, count }]) => {
            return {
                name: name,
                color: color,
                size: this.medium,
                maxSize: size,
                count: count,
            };
        });
    }
}
