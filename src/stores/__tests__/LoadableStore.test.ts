import { describe, test, expect, beforeEach } from "vitest";
import { LoadableStore } from "../LoadableStore";

describe("LoadableStore", () => {
    let loadableStore: LoadableStore;

    beforeEach(() => {
        loadableStore = new LoadableStore();
    });

    test("should have initial value of isLoading set to true", () => {
        expect(loadableStore.isLoading).toBe(true);
    });

    test("should update isLoading correctly", () => {
        loadableStore.updateLoading(false);
        expect(loadableStore.isLoading).toBe(false);

        loadableStore.updateLoading(true);
        expect(loadableStore.isLoading).toBe(true);
    });
});
