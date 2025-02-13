import { makeFacebookUrl } from "../makeFacebookUrl";

describe("[makeFacebookUrl.ts]", () => {
    test("should return the correct facebook", () => {
        const login = "username";
        const expectedUrl = "https://www.facebook.com/username";

        const result = makeFacebookUrl(login);

        expect(result).toBe(expectedUrl);
    });
});
