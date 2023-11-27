import { action, makeAutoObservable, observable } from "mobx";
import { STORAGE_KEYS } from "../constants";
import { AppService } from "../services";
import { IUserData } from "../types";

export class AppStore {
    private appService: AppService;
    public isAuthorized: boolean;
    public login: string;
    public userData: IUserData;

    public constructor(appService: AppService) {
        makeAutoObservable(this, {
            login: observable,
            userData: observable,
            handleRequestAccessTokenError: action,
            handleRequestAccessTokenSuccess: action,
            setLogin: action,
            setUserData: action,
        });

        this.appService = appService;

        this.login = "";

        this.isAuthorized = Boolean(
            localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
        );
    }

    public initAsync = async () => {};

    public setLogin = (login: string) => {
        this.login = login;
    };

    public setUserData = (userData: IUserData) => {
        this.userData = userData;
    };

    public handleRequestAccessTokenSuccess = () => {
        this.isAuthorized = true;

        this.initAsync();
    };

    public handleRequestAccessTokenError = () => {
        this.isAuthorized = false;
    };

    public handleLogout = () => {
        this.isAuthorized = false;
    };
}
