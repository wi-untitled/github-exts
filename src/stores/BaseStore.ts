import { action, makeObservable, observable } from "mobx";

export class BaseStore {
    public isLoading: boolean;

    public constructor() {
        makeObservable(this, {
            isLoading: observable,
            updateLoading: action,
        });

        this.isLoading = true;
    }

    public updateLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
}
