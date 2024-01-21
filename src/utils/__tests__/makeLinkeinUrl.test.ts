import { makeLinkeinUrl } from "..";

describe("[makeLinkeinUrl.ts]", () => {
    test("should return the correct linkedin", () => {
        const login = "username";
        const expectedUrl = "https://www.linkedin.com/username";

        const result = makeLinkeinUrl(login);

        expect(result).toBe(expectedUrl);
    });
});
