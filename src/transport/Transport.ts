import { LinkedList } from "src/core/LinkedList";
import { ICallbackFn, ICallbackFnArguments, ISendAction } from "./types";

export class Transport {
    protected listeners: Map<string, any>;

    public constructor() {
        this.listeners = new Map();
    }

    public sendMessageRuntime = (payload: {
        action: ISendAction;
        data: any;
    }) => {
        window.parent.postMessage(payload, "*");
    };

    public onValueRuntime = <P>(callback: (payload: P) => void) => {
        chrome.runtime.onMessage.addListener(callback);
    };

    public addListener = <T>(
        listenerName: string,
        callback: ICallbackFn<T>,
    ) => {
        if (this.listeners.has(listenerName)) {
            const linkedList = this.listeners.get(listenerName);

            linkedList.add(callback);
        } else {
            const linkedList = new LinkedList();

            linkedList.add(callback);

            this.listeners.set(listenerName, linkedList);
        }
    };

    public removeListener = <T>(
        listenerName: string,
        callback: ICallbackFn<T>,
    ) => {
        if (this.listeners.has(listenerName)) {
            const linkedList = this.listeners.get(listenerName);

            linkedList.remove(callback);
        }
    };

    public sendMessage = <T>(data: ICallbackFnArguments<T>) => {
        if (this.listeners.has(data.action)) {
            const linkedList = this.listeners.get(data.action);

            let cursor = linkedList.head;

            while (cursor) {
                if (typeof cursor.value === "function") {
                    cursor.value(data);
                }

                cursor = cursor.next;
            }
        }
    };
}

let singleton: Transport | undefined;

export function getTransport() {
    singleton ||= new Transport();

    return singleton;
}
