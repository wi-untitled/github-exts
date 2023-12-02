import {
    action,
    makeAutoObservable,
    observable,
    override,
    reaction,
    when,
} from "mobx";
import { STORAGE_KEYS } from "src/constants";
import { AppService } from "src/services";
import { IUserData } from "src/types";
import { BaseStore } from "./BaseStore";

export class AppStore extends BaseStore {
    public userData: IUserData;
    public accessToken: string | null;
    public appService: AppService;

    public constructor() {
        super();

        makeAutoObservable(this, {
            isLoading: override,
            accessToken: observable,
            userData: observable,
            setUserData: action,
            setAccessToken: action,
            updateLoading: override,
        });

        this.accessToken = "";
        this.appService = new AppService();

        this.init();

        when(
            () => this.isAuthorized,
            async () => {
                await this.initAsync();
            },
        );

        reaction(
            () => this.accessToken,
            (accessToken: string | null) => {
                if (accessToken) {
                    localStorage.setItem(
                        STORAGE_KEYS.ACCESS_TOKEN,
                        accessToken,
                    );
                }
            },
        );
    }

    public init = () => {
        this.initializeAccessToken();
    };

    public initializeAccessToken = (): void => {
        try {
            const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

            if (token) {
                this.setAccessToken(token);
            }
        } catch (error) {
            console.error(error);
        }
    };

    public initAsync = async (): Promise<void> => {
        await this.initUserData();
    };

    public initUserData = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const userData = await this.appService.getUserData();

            this.setUserData(userData);
            this.updateLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    public setUserData = (userData: IUserData) => {
        this.userData = userData;
    };

    public handleLogout = (): void => {
        this.setAccessToken(null);

        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    };

    public setAccessToken = (accessToken: string | null): void => {
        this.accessToken = accessToken;
    };

    public get isAuthorized(): boolean {
        return Boolean(this.accessToken);
    }
}
