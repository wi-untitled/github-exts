import { action, makeAutoObservable } from "mobx";
import { STORAGE_KEYS } from "../constants";

export class AppStore {
    public isAuthorized: boolean;

    public constructor() {
        makeAutoObservable(this, {
            handleRequestAccessTokenError: action,
            handleRequestAccessTokenSuccess: action,
        });

        this.isAuthorized = Boolean(
            localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
        );
    }

    public handleRequestAccessTokenSuccess = () => {
        this.isAuthorized = true;
    };

    public handleRequestAccessTokenError = () => {
        this.isAuthorized = false;
    };

    public handleLogout = () => {
        this.isAuthorized = false;
    };
}
