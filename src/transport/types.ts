export interface IFRAME_TOGGLE_EVENT {
    action: ISendAction;
    data: { isOpen: boolean };
}

export type ISendAction =
    | "BROADCAST"
    | "NOTIFY_BROADCAST"
    | "IFRAME_TOGGLE"
    | "AutoUpdateChange";

export interface ICallbackFnArguments<T> {
    action: ISendAction;
    data: T;
}

export type ICallbackFn<T> = ({
    action,
    data,
}: ICallbackFnArguments<T>) => void;
