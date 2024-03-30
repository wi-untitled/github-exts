import { Octokit } from "octokit";
import { TopLanguagesService } from "../TopLanguagesService";
import { STORAGE_KEYS } from "src/constants";
import { Mock } from "vitest";

const mock = {
    user: {
        repositories: {
            nodes: [
                {
                    name: "repo1",
                    languages: {
                        edges: [
                            {
                                size: 100,
                                node: {
                                    color: "color1",
                                    name: "language1",
                                },
                            },
                            {
                                size: 200,
                                node: {
                                    color: "color2",
                                    name: "language2",
                                },
                            },
                        ],
                    },
                },
                {
                    name: "repo2",
                    languages: {
                        edges: [
                            {
                                size: 300,
                                node: {
                                    color: "color3",
                                    name: "language3",
                                },
                            },
                            {
                                size: 400,
                                node: {
                                    color: "color4",
                                    name: "language4",
                                },
                            },
                        ],
                    },
                },
            ],
        },
    },
};

describe("TopLanguagesService", () => {
    let topLanguagesService: TopLanguagesService;

    beforeEach(() => {
        topLanguagesService = new TopLanguagesService();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("getTopLanguages", () => {
        test("should return top languages of user repositories", async () => {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, "1234");

            vi.spyOn(topLanguagesService, "isAuthorized").mockImplementation(
                () => true,
            );

            (Octokit.prototype.graphql as Mock).mockResolvedValueOnce(mock);

            const result = await topLanguagesService.getTopLanguages("login");

            expect(result).toEqual([
                [
                    "language4",
                    { size: 400, color: "color4", name: "language4", count: 0 },
                ],
                [
                    "language3",
                    { size: 300, color: "color3", name: "language3", count: 0 },
                ],
                [
                    "language2",
                    { size: 200, color: "color2", name: "language2", count: 0 },
                ],
                [
                    "language1",
                    { size: 100, color: "color1", name: "language1", count: 0 },
                ],
            ]);

            expect(topLanguagesService.isAuthorized).toHaveBeenCalledTimes(1);
        });

        test("should return an empty array if an error occurs", async () => {
            vi.spyOn(topLanguagesService, "isAuthorized").mockImplementation(
                () => false,
            );

            const result = await topLanguagesService.getTopLanguages("login");

            expect(result).toEqual([]);
            expect(topLanguagesService.isAuthorized).toHaveBeenCalledTimes(1);
        });
    });
});
