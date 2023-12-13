import { action, makeObservable, observable } from "mobx";
import { Transport, getTransport } from "src/transport";

export class BaseStore {
    public isLoading: boolean;
    protected transport: Transport;

    public constructor() {
        makeObservable<BaseStore, "updateLoading">(this, {
            isLoading: observable,
            updateLoading: action,
        });

        this.isLoading = true;

        this.transport = getTransport();
    }

    protected updateLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
}
