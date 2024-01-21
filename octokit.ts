import { vi } from "vitest";

vi.mock("octokit", () => {
    const T = function () {};

    T.prototype.rest = {
        users: { getAuthenticated: vi.fn() },
    };

    T.prototype.graphql = vi.fn();

    return {
        Octokit: T,
    };
});
