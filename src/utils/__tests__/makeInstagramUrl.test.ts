import { describe, test, expect } from "vitest";
import { makeInstagramUrl } from "..";

describe("[makeInstagramUrl.ts]", () => {
    test("should return the correct instagram", () => {
        const login = "username";
        const expectedUrl = "https://www.instagram.com/username";

        const result = makeInstagramUrl(login);

        expect(result).toBe(expectedUrl);
    });
});
