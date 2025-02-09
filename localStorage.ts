const localStorageMock: Storage = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string): string => store[key] ?? null,
        setItem: (key: string, value: string): void => {
            store[key] = value.toString();
        },
        removeItem: (key: string): void => {
            delete store[key];
        },
        clear: (): void => {
            store = {};
        },
        key: (_: number): string | null => "",
        length: Object.keys(store).length,
    };
})();

let originalLocalStorage: Storage;

beforeEach(() => {
    originalLocalStorage = window.localStorage;

    (window as any).localStorage = localStorageMock;

    localStorage.clear();
});

afterEach(() => {
    (window as any).localStorage = originalLocalStorage;
});
