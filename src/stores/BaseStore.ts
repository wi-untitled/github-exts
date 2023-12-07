import { action, makeObservable, observable } from "mobx";
import { Transport } from "src/transport";

export class BaseStore {
    public isLoading: boolean;
    protected transport: Transport;

    public constructor(transport: Transport) {
        makeObservable<BaseStore, "updateLoading">(this, {
            isLoading: observable,
            updateLoading: action,
        });

        this.isLoading = true;

        this.transport = transport;
    }

    protected updateLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
}
