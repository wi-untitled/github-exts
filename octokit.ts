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
//
// import { vi } from "vitest";
//
// vi.mock("src/utils", async () => {
//     console.log(4242424242424);
//     return {
//         Locale: {
//             formatNumber: () => "42",
//         },
//     };
// });
