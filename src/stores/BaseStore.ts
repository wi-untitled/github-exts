import { makeObservable, observable } from "mobx";

export class BaseStore {
    public isLoading: boolean;

    public constructor() {
        makeObservable(this, {
            isLoading: observable,
        });

        this.isLoading = true;
    }

    public updateLoading = async (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
}
