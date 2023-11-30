import { action, makeAutoObservable, observable, reaction } from "mobx";
import { STORAGE_KEYS } from "src/constants";
import { AppService } from "src/services";
import { IUserData } from "src/types";

export class AppStore {
    public userData: IUserData;
    public accessToken: string | null;
    public appService: AppService;

    public constructor() {
        makeAutoObservable(this, {
            accessToken: observable,
            userData: observable,
            setUserData: action,
            setAccessToken: action,
        });

        this.accessToken = "";

        this.appService = new AppService();

        this.init();
        this.initAsync();

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
        if (this.isAuthorized) {
            const userData = await this.appService.getUserData();

            this.setUserData(userData);
        }
    };

    public setUserData = (userData: IUserData) => {
        this.userData = userData;
    };

    public handleLogout = (): void => {
        this.setAccessToken(null);
    };

    public setAccessToken = (accessToken: string | null): void => {
        this.accessToken = accessToken;
    };

    public get isAuthorized(): boolean {
        return Boolean(this.accessToken);
    }
}
