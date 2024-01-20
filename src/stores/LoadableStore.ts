import { action, makeObservable, observable } from "mobx";
import { ILoadable } from "./interfaces";

export class LoadableStore implements ILoadable {
    public isLoading: boolean;

    public constructor() {
        makeObservable<LoadableStore, "updateLoading">(this, {
            isLoading: observable,
            updateLoading: action,
        });

        this.isLoading = true;
    }

    public updateLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
}
