import { ISendAction } from "./types";

export class Transport {
    public constructor() {}

    public sendMessage = (payload: { action: ISendAction; data: any }) => {
        window.parent.postMessage(payload, "*");
    };

    public onValue = <P>(callback: (payload: P) => void) => {
        chrome.runtime.onMessage.addListener(callback);
    };
}

let singleton: Transport | undefined;

export function getTransport() {
    singleton ||= new Transport();

    return singleton;
}
