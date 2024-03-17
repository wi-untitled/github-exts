import { describe, test, expect } from "vitest";
import { makeYoutubeUrl } from "../makeYoutubeUrl";

describe("[makeYoutubeUrl.ts]", () => {
    test("should return the correct youtube", () => {
        const login = "username";
        const expectedUrl = "https://www.youtube.com/username";

        const result = makeYoutubeUrl(login);

        expect(result).toBe(expectedUrl);
    });
});
