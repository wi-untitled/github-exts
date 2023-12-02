import { action, makeObservable, observable } from "mobx";

export class BaseStore {
    public isLoading: boolean;

    public constructor() {
        makeObservable<BaseStore, "updateLoading">(this, {
            isLoading: observable,
            updateLoading: action,
        });

        this.isLoading = true;
    }

    protected updateLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
}
