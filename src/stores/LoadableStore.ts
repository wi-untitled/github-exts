import { action, makeObservable, observable } from "mobx";

export class LoadableStore {
    public isLoading: boolean;

    public constructor() {
        makeObservable<LoadableStore, "updateLoading">(this, {
            isLoading: observable,
            updateLoading: action,
        });

        this.isLoading = true;
    }

    protected updateLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
}
